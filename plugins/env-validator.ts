import fs from 'fs';
import path from 'path';
import type {RsbuildPlugin} from '@rsbuild/core';

interface EnvValidatorOptions {
  /**
   * Source directory to scan for environment variables
   * @default 'src'
   */
  srcDir?: string;

  /**
   * File extensions to scan
   * @default ['ts', 'tsx']
   */
  fileExtensions?: string[];

  /**
   * Patterns to ignore when scanning files
   * @default []
   */
  ignorePatterns?: string[];

  /**
   * Whether to log successful validation
   * @default true
   */
  verbose?: boolean;
}

export const envValidatorPlugin = (
  options: EnvValidatorOptions = {}
): RsbuildPlugin => {
  const {
    srcDir = 'src',
    fileExtensions = ['ts', 'tsx'],
    ignorePatterns = [],
    verbose = true,
  } = options;

  return {
    name: 'rsbuild:env-validator',
    setup(api) {
      api.onBeforeBuild(() => {
        const envVars = new Set<string>();
        let scannedFiles = 0;

        // Recursively scan directory for TypeScript files
        const scanDirectory = (dirPath: string): void => {
          if (!fs.existsSync(dirPath)) {
            if (verbose) {
              console.warn(
                `⚠️  Warning: Source directory "${dirPath}" does not exist`
              );
            }
            return;
          }

          fs.readdirSync(dirPath).forEach(file => {
            const fullPath = path.join(dirPath, file);
            const stat = fs.statSync(fullPath);

            // Skip ignored patterns
            if (ignorePatterns.some(pattern => fullPath.includes(pattern))) {
              return;
            }

            if (stat.isDirectory()) {
              scanDirectory(fullPath);
            } else if (fileExtensions.some(ext => file.endsWith(`.${ext}`))) {
              try {
                const content = fs.readFileSync(fullPath, 'utf8');
                scannedFiles++;

                // Find all process.env.VARIABLE_NAME patterns
                const patterns = [
                  /process\.env\.([A-Z_][A-Z0-9_]*)/g,
                  /process\.env\[['"]([A-Z_][A-Z0-9_]*)['"]\]/g,
                ];

                patterns.forEach(pattern => {
                  let match;
                  pattern.lastIndex = 0; // Reset regex
                  while ((match = pattern.exec(content)) !== null) {
                    envVars.add(match[1]);
                  }
                });
              } catch (error) {
                if (verbose) {
                  console.warn(
                    `⚠️  Warning: Could not read file ${fullPath}:`,
                    error
                  );
                }
              }
            }
          });
        };

        // Scan source directory
        scanDirectory(srcDir);

        // Check for undefined variables
        const undefinedVars = Array.from(envVars).filter(
          (envVar: string) => process.env[envVar] === undefined
        );

        if (undefinedVars.length > 0) {
          const errorMessage = [
            '❌ Environment Variable Validation Failed',
            '',
            'The following environment variables are referenced in your code but not defined:',
            ...undefinedVars.map((v: string) => `  • process.env.${v}`),
            '',
            'Please ensure these variables are defined in your .env file or environment.',
            `Scanned ${scannedFiles} files in ${srcDir}/ directory`,
          ].join('\n');

          console.error(errorMessage);
          process.exit(1);
        }

        if (verbose) {
          if (envVars.size > 0) {
            console.log(
              `✅ Environment validation passed (${envVars.size} variables validated across ${scannedFiles} files)`
            );
          } else {
            console.log(
              `✅ No environment variables found in ${scannedFiles} scanned files`
            );
          }
        }
      });
    },
  };
};

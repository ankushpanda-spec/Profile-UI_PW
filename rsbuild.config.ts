import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { dependencies } from './package.json';

export default defineConfig({
  output: {
    assetPrefix: '/study-v2/',
  },
  server: {
    port: 3000,
  },
  html: {
    template: './public/index.html',
  },
  source: {
    entry: {
      index: './src/index.tsx',
    },
    alias: {
      "@/*": "./src/*"
    }
  },

  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'MFCommon',
      filename: 'remoteEntry.js',
      exposes: {
        './profile': './src/pages/Profile/index.tsx',
        './pdf': './src/pages/Pdf/index.tsx'
      },
      shared: {
        react: {
          singleton: true,
          version: dependencies['react'],
        },
        'react-dom': {
          singleton: true,
          version: dependencies['react-dom'],
        },
        'react-router-dom': {
          singleton: true,
        },
        '@pw-tech/omni-context': {
          singleton: true,
        },
        '@pw-tech/web-sdk': {
          singleton: true,
        },

      },
    }),
  ],
  tools: {
    rspack: (config, {appendPlugins}) => {
      appendPlugins([]);
    },
  },

});

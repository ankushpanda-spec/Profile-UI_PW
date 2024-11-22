import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';
import {dependencies} from './package.json';
export default defineConfig({
  server: {
    port: 3001,
  },
  moduleFederation: {
    options: {
      name: 'MFCommon',
      filename: 'remoteEntry.js',
      exposes: {
        './profile': './src/pages/Profile/index.tsx',
        './pdf': './src/pages/Pdf/index.tsx'
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: dependencies['react'],
        },
        'react-dom': {
          singleton: true,
          requiredVersion: dependencies['react-dom'],
        },
        '@pw-tech/omni-context': {
          singleton: true,
        },
      },
    },
  },
  plugins: [pluginReact()],
  tools: {
    rspack: (config, {appendPlugins}) => {
      appendPlugins([]);
    },
  },
});

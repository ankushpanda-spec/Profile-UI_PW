import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';
import path from 'path';
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
        'shared-context' : {
          singleton: true,
        }
      },
    }
  }, 
  plugins: [pluginReact()],
  tools: {
    rspack: (config, {appendPlugins}) => {
      appendPlugins([
      ]);
    },
  },
});

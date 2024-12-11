import {pluginModuleFederation} from '@module-federation/rsbuild-plugin';
import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';
import path from 'path';
import {dependencies} from './package.json';

export default defineConfig({
  server: {
    port: 3001,
  },
  html: {
    template: './public/index.html',
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'MFCommon',
      filename: 'remoteEntry.js',
      exposes: {
        './profile': './src/pages/Profile/index.tsx',
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
        '@pw-tech/omni-context': {
          singleton: true,
        },
      },
      runtimePlugins: [
        path.resolve(__dirname, './hooks-mf/offlineRemotePlugin.ts'),
      ],
    }),
  ],
  tools: {
    rspack: (config, {appendPlugins}) => {
      appendPlugins([]);
    },
  },
});

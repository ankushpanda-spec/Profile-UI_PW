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
  source: {
    entry: {
      index: "./src/index.tsx",
    },
    alias: {
      '@/*': './src/*',
    },
  },
  output: {
    assetPrefix: process.env.PUBLIC_FE_URL,
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'MFCommon',
      filename: 'remoteEntry.js',
      exposes: {
        './MfCommon': './src/routes/RouteList.tsx',
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
        'react-router-dom': {
          singleton: true,
          requiredVersion: dependencies['react-router-dom'],
        },
        '@pw-tech/omni-context': {
          singleton: true,
        },
        '@pw-tech/web-sdk': {
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

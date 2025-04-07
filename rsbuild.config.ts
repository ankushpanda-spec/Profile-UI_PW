import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { sentryWebpackPlugin } from '@sentry/webpack-plugin';
import path from 'path';
import { dependencies } from './package.json';

export default defineConfig({
  server: {
    port: 3001,
  },
  html: {
    template: './public/index.html',
  },
  source: {
    entry: {
      index: './src/app/index.tsx',
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
      filename: `remoteEntry.js?v=${Date.now()}`,
      exposes: {
        './MfCommon': './src/app/routes/RouteList.tsx',
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
      config.devtool = 'source-map';
      appendPlugins([
        sentryWebpackPlugin({
          moduleMetadata: {
            dsn: process.env.PUBLIC_SENTRY_DSN, // Replace with your project's DSN
          },
        }),
      ]);
      return config;
    },
  },
});

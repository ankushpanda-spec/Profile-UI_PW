import {ModuleFederationPlugin} from '@module-federation/enhanced/rspack';
import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';
import path from 'path';
import {dependencies} from './package.json';
export default defineConfig({
  output: {
    assetPrefix: 'http://localhost:3001',
  },
  server: {
    port: 3001,
  },
  html: {
    template: './public/index.html',
  },
  plugins: [pluginReact()],
  tools: {
    rspack: (config, {appendPlugins}) => {
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'MFCommon',
          filename: 'remoteEntry.js',
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
              version: dependencies['react-router-dom'],
            },
          },
          runtimePlugins: [
            path.resolve(__dirname, './hooks-mf/offlineRemotePlugin.ts'),
          ],
          exposes: {
            './profile': './src/pages/Profile/index.tsx',
          },
        }),
      ]);
    },
  },
});

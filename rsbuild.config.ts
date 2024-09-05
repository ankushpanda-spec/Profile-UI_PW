import {ModuleFederationPlugin} from '@module-federation/enhanced/rspack';
import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';
import path from 'path';
import {dependencies} from './package.json';
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
  plugins: [pluginReact()],
  tools: {
    rspack: (config, {appendPlugins}) => {
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'shell',
          shared: {
            react: {
              singleton: true,
              //  eager: true,
              version: dependencies['react'],
            },
            'react-dom': {
              singleton: true,
              //eager: true,
              version: dependencies['react-dom'],
            },
            'react-router-dom': {
              singleton: true,
              //eager: true,
            },
          },
          runtimePlugins: [
            path.resolve(__dirname, './hooks-mf/offlineRemotePlugin.ts'),
          ],
        }),
      ]);
    },
  },
});

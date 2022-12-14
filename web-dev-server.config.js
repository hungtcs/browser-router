import { esbuildPlugin } from '@web/dev-server-esbuild';

/**
 * @type {import('@web/dev-server').DevServerConfig}
 */
export default {
  open: 'src',
  watch: true,
  appIndex: 'src/index.html',
  plugins: [
    esbuildPlugin({
      ts: true,
      tsconfig: 'tsconfig.app.json'
    }),
  ],
  nodeResolve: true,
};

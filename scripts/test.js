import esbuild from 'esbuild';
import path from 'path';

import log from './plugins/log.js';
import dom from './plugins/dom.js';

esbuild.build({
  entryPoints: ['src/**/*.spec.ts'],
  bundle: true,
  format: 'esm',
  outdir: path.resolve(process.cwd(), 'build/test'),
  define: {
    IS_JSDOM: 'true'
  },
  external: [
    'tape',
    'jsdom',
    'forgo',
    'immer',
    'runtypes'
  ],
  loader: {
    '.scss': 'empty'
  },
  platform: 'node',
  plugins: [log('test'), dom]
});

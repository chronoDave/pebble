import esbuild from 'esbuild';
import path from 'path';
import fsp from 'fs/promises';
import sass from '@chronocide/esbuild-plugin-sass';

import { assets } from './lib/dir.js';
import log from './plugins/log.js';

const watch = process.argv.slice(2).includes('-w');
const outdir = path.resolve(process.cwd(), watch ? 'build' : 'docs');

const common = {
  define: {
    IS_JSDOM: 'false'
  },
  bundle: true,
  minify: !watch,
  metafile: true,
  sourcemap: watch,
  outdir
};

const configs = [{
  ...common,
  entryPoints: [
    'src/index.html',
    'src/index.tsx',
    ...await assets('src/assets')
  ],
  loader: {
    '.html': 'copy',
    '.png': 'copy',
    '.ico': 'copy',
    '.svg': 'copy',
    '.json': 'copy'
  },
  plugins: [
    log('index'),
    sass({
      minify: !watch,
      depedencies: ['src/scss/lib'],
      deprecations: {
        ignore: ['mixed-decls']
      }
    })
  ]
}];

await fsp.rm(outdir, { recursive: true, force: true });
if (watch) {
  const contexts = await Promise.all(configs.map(config => esbuild.context(config)));
  contexts.forEach(context => context.watch());
} else {
  const results = await Promise.all(configs.map(config => esbuild.build(config)));
  await Promise.all(results.map(result => fsp.writeFile(
    path.join(outdir, 'build.meta.json'),
    JSON.stringify(result.metafile)
  )));
}

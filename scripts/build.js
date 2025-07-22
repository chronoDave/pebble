import esbuild from 'esbuild';
import path from 'path';
import fsp from 'fs/promises';
import sass from '@chronocide/esbuild-plugin-sass';

import log from './plugins/log.js';

const watch = process.argv.slice(2).includes('-w');
const outdir = path.resolve(process.cwd(), watch ? 'build' : 'docs');

const configs = [{
  entryPoints: [
    'src/index.ts'
  ],
  outdir,
  bundle: true,
  minify: !watch,
  metafile: watch,
  sourcemap: watch,
  plugins: [
    log('esbuild'),
    sass({
      minify: !watch,
      deprecations: {
        ignore: ['mixed-decls']
      }
    })
  ]
}];

await fsp.rm(outdir, { recursive: true, force: true });
await fsp.cp(path.resolve(process.cwd(), 'src/assets'), outdir, { recursive: true });
await fsp.cp(path.resolve(process.cwd(), 'src/index.html'), path.resolve(outdir, 'index.html'));

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

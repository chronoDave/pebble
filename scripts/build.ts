import type { BuildOptions } from 'esbuild';

import esbuild from 'esbuild';
import path from 'path';
import fsp from 'fs/promises';
import sass from '@chronocide/esbuild-plugin-sass';

import log from './plugins/log.ts';

const watch = process.argv.slice(2).includes('-w');
const outdir = path.resolve(process.cwd(), watch ? 'build' : 'docs');

const config: BuildOptions = {
  entryPoints: [
    'src/index.ts',
    'src/index.html'
  ],
  loader: {
    '.html': 'copy'
  },
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
};

await fsp.rm(outdir, { recursive: true, force: true });
await fsp.cp(path.resolve(process.cwd(), 'src/assets'), outdir, { recursive: true });

if (watch) {
  const context = await esbuild.context(config);
  await context.watch();
} else {
  const result = await esbuild.build(config);
  await fsp.writeFile(path.join(outdir, 'build.meta.json'), JSON.stringify(result.metafile));
}

import esbuild from 'esbuild';

export default {
  name: 'dom',
  setup: build => {
    build.onLoad({ filter: /\.fixture.tsx$/u }, async args => {
      const result = await esbuild.build({
        entryPoints: [args.path],
        bundle: true,
        write: false,
        minify: true,
        metafile: true,
        format: 'esm',
        define: build.initialOptions.define,
        loader: {
          '.scss': 'empty'
        },
        outdir: 'temp'
      });

      return {
        contents: result.outputFiles[0].contents,
        watchFiles: Object.keys(result.metafile.inputs),
        loader: 'text'
      };
    });
  }
};

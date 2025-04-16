import fsp from 'fs/promises';

export default {
  name: 'clean',
  setup: build => {
    build.onStart(async () => {
      await fsp.rm(build.initialOptions.outdir, {
        recursive: true,
        force: true
      });
    });
  }
};

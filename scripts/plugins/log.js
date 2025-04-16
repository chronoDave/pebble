export default title => ({
  name: 'log',
  setup: build => {
    const label = `[esbuild] ${title}`;

    build.onStart(() => {
      console.time(label);
    });
    build.onEnd(() => {
      console.timeEnd(label);
    });
  }
});

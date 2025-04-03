export default <T, K>(...fns: Array<(x: T) => K>) =>
  (x: T) =>
    fns.map(fn => fn(x));
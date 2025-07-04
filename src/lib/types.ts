export type Only<T, P> = {
  [K in keyof T]: T[K] extends P ? K : never;
}[keyof T];

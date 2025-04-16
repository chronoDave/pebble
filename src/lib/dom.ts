export const attribute = (key: string) =>
  (element?: Element | null) => {
    const x = element?.getAttribute(key);
    if (typeof x !== 'string') throw new Error(`Missing attribute: ${key}`);

    return x;
  };

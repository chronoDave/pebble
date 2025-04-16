import type { Component } from 'forgo';

export const subscribe = <T extends keyof DocumentEventMap>(
  type: T,
  listener: (event: DocumentEventMap[T]) => void,
  options?: AddEventListenerOptions
) => <S extends object>(component: Component<S>) => {
  component.mount(() => {
    document.addEventListener(type, listener, options);
  });

  component.unmount(() => {
    document.removeEventListener(type, listener);
  });
};

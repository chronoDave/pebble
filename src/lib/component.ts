import type { Component } from 'forgo';

export type Listener<T extends keyof DocumentEventMap> = (event: DocumentEventMap[T]) => void;

export const subscribe = <T extends keyof DocumentEventMap>(
  type: T,
  listener: Listener<T>,
  options?: AddEventListenerOptions
) => <S extends object>(component: Component<S>) => {
  component.mount(() => {
    document.addEventListener(type, listener, options);
  });

  component.unmount(() => {
    document.removeEventListener(type, listener);
  });
};

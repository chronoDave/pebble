import type { Component } from 'forgo';

export default class State<S extends object> {
  private readonly _id: string;

  private _state: boolean;
  private _component?: Component<S>;

  constructor(id: string) {
    this._id = id;
    this._state = false;
  }

  get open() {
    return this._state;
  }

  set open(open: boolean) {
    if (!this._component) throw new Error('Component did not call "subscribe()"');
  
    this._state = open;
    this._component.update();
  }

  subscribe(component: Component<S>) {
    this._component = component;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') this.open = false;
    };

    component.unmount(() => {
      document.removeEventListener('keyup', handleEscape);
    });

    component.mount(() => {
      document.addEventListener('keyup', handleEscape, { passive: true });
    });
  }
}
import type { Component } from 'forgo';

export default class State<S extends object> {
  private readonly _id: string;

  private _state: boolean;
  private _component?: Component<S>;

  constructor(id: string) {
    this._id = id;
    this._state = false;
  }

  get expanded() {
    return this._state;
  }

  set expanded(expanded: boolean) {
    if (!this._component) throw new Error('Component did not call "subscribe()"');
  
    this._state = expanded;
    this._component.update();
  }

  subscribe(component: Component<S>) {
    this._component = component;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') this.expanded = false;
    };

    const handleClick = (event: MouseEvent) => {
      const element = event.target as Element | null;
      if (element && !element.closest(`#${this._id}`)) this.expanded = false;
    };

    component.unmount(() => {
      document.removeEventListener('keyup', handleEscape);
      document.removeEventListener('click', handleClick);
    });

    component.mount(() => {
      document.addEventListener('keyup', handleEscape, { passive: true });
      document.addEventListener('click', handleClick, { passive: true });
    });
  }
}
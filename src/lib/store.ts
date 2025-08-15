import Stack from './stack.ts';

export type View<S extends object> = { previous: S | null, current: S };
export type Subscriber<S extends object> = (view: View<S>) => void;
export type Reducer<S extends object> = (state: S) => S;

export default class Store<S extends object> {
  private readonly _stack: Stack<S>;
  private readonly _subscribers: Set<Subscriber<S>>;

  private get _previous(): S | null {
    return this._stack.peek(-1);
  }

  get state(): S {
    const state = this._stack.peek();
    if (!state) throw new Error('Missing default state');

    return state;
  }

  private _update(): this {
    this._subscribers.forEach(subscriber => subscriber({
      previous: this._previous,
      current: this.state
    }));

    return this;
  }

  constructor(state: S) {
    this._stack = new Stack(50);
    this._subscribers = new Set();
    this._stack.push(state);
  }

  undo(): this {
    if (!this._previous) return this;

    this._stack.pop();

    return this._update();
  }

  update(reducer: Reducer<S>): this {
    this._stack.push(reducer(this.state));

    return this._update();
  }

  on(subscriber: Subscriber<S>): this {
    if (!this._subscribers.has(subscriber)) this._subscribers.add(subscriber);

    return this;
  }

  off(subscriber: Subscriber<S>): this {
    this._subscribers.delete(subscriber);

    return this;
  }
}
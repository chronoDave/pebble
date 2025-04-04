import * as forgo from 'forgo';
import test from 'tape';
import { JSDOM } from 'jsdom';

import Store from './store';

test('[store] listens and dispatches', t => {
  const state = { x: 1 };
  const store = new Store(state);

  store
    .on(state => {
      t.pass('listens to dispatch');
      t.deepEqual(state.current, { x: 2 }, 'updates state');
      t.deepEqual(state.previous, { x: 1 }, 'keeps previous state');
      t.end();
    })
    .set(() => ({ x: 2 }));
});

test('[store] removes listeners', t => {
  let x = 1;
  const store = new Store({ x });

  const subscriber = () => {
    x += 1;
  };

  store
    .on(subscriber)
    .off(subscriber)
    .on(() => {
      t.equal(x, 1, 'does not fire event');
      t.end();
    })
    .set(() => ({ x }));
});

test('[store.select] returns slice on component update', t => {
  let renders = 0;

  const jsdom = new JSDOM('<body></body>');
  forgo.setCustomEnv({ window: jsdom.window, document: jsdom.window.document });

  const store = new Store({ a: { b: 1 } });
  const selector = store.select(state => () => state?.a.b);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const Body = () => {
    const component = new forgo.Component({
      render() {
        const state = selector.state();

        if (renders > 0) {
          t.equal(state, 2, 'renders on store update');
          t.end();
        } else {
          t.equal(state, 1, 'initial render');
        }

        renders += 1;

        return 'state';
      }
    });

    selector.subscribe()(component);

    return component;
  };

  forgo.mount(<Body />, jsdom.window.document.body);

  t.equal(selector.state(), 1, 'returns selection');

  store.set(() => ({ a: { b: 2 }}));
});

import type { State } from './schema';

import { produce } from 'immer';

import Store from '../lib/store/store';
import Storage from '../lib/storage/storage';
import createDropzone from '../lib/dropzone/dropzone';

import * as active from './actions/active';
import { state as schema } from './schema';

const storage = new Storage('state', schema);
const store = new Store<State>(storage.read() ?? {
  entity: {
    board: {},
    lane: {},
    card: {},
    task: {},
    category: {}
  },
  active: {}
}, {
  subscribers: [
    ({ previous, current }) => {
      if (typeof current.active.board === 'string') {
        if (
          previous?.active.board !== current.active.board ||
          current.entity.board[current.active.board].title !== previous.entity.board[previous.active.board].title
        ) document.title = `${current.entity.board[current.active.board].title} | Pebble`;
      } else {
        document.title = 'Pebble';
      }
    }
  ]
})
  .on(state => storage.write(state.current))
  .on(console.log);

document.addEventListener('keyup', event => {
  if (event.ctrlKey && event.key === 'z') store.undo();
});

document.addEventListener('keyup', event => {
  if (event.key === 'Escape') store.set(produce(active.set('drawer')()));
});

createDropzone(raw => {
  try {
    const json = JSON.parse(raw);
    schema.check(json);
    store.set(() => json);
  } catch (err) {
    console.error(err);
  }
});

export default store;

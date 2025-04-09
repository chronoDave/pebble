import type { State } from './schema';

import Store from '../lib/store/store';
import Storage from '../lib/storage/storage';
import createDropzone from '../lib/dropzone/dropzone';

import { state as schema } from './schema';
import uid from '../lib/string/uid';

const board = uid();
const lane = uid();

const storage = new Storage('state', schema);
const store = new Store<State>(storage.read() ?? {
  entity: {
    board: {
      [board]: {
        id: board,
        title: 'New board',
        lanes: [lane],
        categories: []
      }
    },
    lane: {
      [lane]: {
        id: lane,
        title: 'New lane',
        cards: []
      }
    },
    card: {},
    task: {},
    category: {}
  },
  active: {
    board
  }
}, {
  subscribers: [
    ({ previous, current }) => {
      if (
        previous?.active.board !== current.active.board ||
        typeof current.active.board === 'string' &&
        previous?.entity.board[current.active.board]?.title !== current.entity.board[current.active.board]?.title
      ) {
        const title = typeof current.active.board === 'string' && current.entity.board[current.active.board]?.title;
        document.title = typeof title === 'string' ?
          `${title} | Pebble` :
          'Pebble';
      }
    }
  ]
})
  .on(state => storage.write(state.current))
  .on(console.log);

document.addEventListener('keyup', event => {
  if (event.ctrlKey && event.key === 'z') store.undo();
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

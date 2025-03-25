import type { State } from './schema';

import uid from '../lib/string/uid';

const board = uid();
const lane = uid();

const state: State = {
  entity: {
    category: {},
    task: {},
    card: {},
    lane: {
      [lane]: {
        id: lane,
        cards: []
      }
    },
    board: {
      [board]: {
        id: board,
        title: 'New board',
        lanes: [lane]
      }
    }
  },
  active: {
    board: board,
    drawer: true
  }
};

export default state;

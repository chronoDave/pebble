import type {
  Board,
  Card,
  Task,
  Lane
} from '../../schema';

import test from 'tape';
import { produce } from 'immer';

import createStore from '../../store.struct';

import * as actions from './entity';

test('[entity.set] sets entity', t => {
  const store = createStore();
  const board: Board = { id: 'a', categories: [], lanes: [] };

  store.set(produce(actions.set('board')(board)));
  t.equal(Object.keys(store.current.entity.board).length, 1, 'sets entity');

  t.end();
});

test('[entity.string] sets string property', t => {
  const store = createStore();
  const card: Card = { id: 'b', categories: [], tasks: [] };

  store.set(produce(actions.set('card')(card)));

  store.set(produce(actions.string('card')('title')(card.id)('title')));
  t.equal(store.current.entity.card[card.id].title, 'title', 'sets title');

  store.set(produce(actions.string('card')('title')(card.id)()));
  t.false(store.current.entity.card[card.id].title, 'removes title');

  t.end();
});

test('[entity.boolean] sets boolean property', t => {
  const store = createStore();
  const task: Task = { id: 'c' };

  store.set(produce(actions.set('task')(task)));

  store.set(produce(actions.boolean('task')('done')(task.id)(true)));
  t.true(store.current.entity.task[task.id].done, 'true');

  store.set(produce(actions.boolean('task')('done')(task.id)(false)));
  t.false(store.current.entity.task[task.id].done, 'false');

  store.set(produce(actions.boolean('task')('done')(task.id)()));
  t.true(store.current.entity.task[task.id].done, 'inverted');

  t.end();
});

test('[entity.push] adds item to list', t => {
  const store = createStore();
  const board: Board = { id: 'd', categories: [], lanes: [] };
  const lane: Lane = { id: 'e', cards: [] };

  store.set(produce(actions.set('board')(board)));
  store.set(produce(actions.set('lane')(lane)));

  store.set(produce(actions.push('board')('lanes')(board.id)(lane.id)));
  t.equal(store.current.entity.board[board.id].lanes.length, 1, 'adds item');
  t.true(store.current.entity.board[board.id].lanes.includes(lane.id), 'has item');

  t.end();
});

test('[entity.pull] removes item from list', t => {
  const store = createStore();
  const board: Board = { id: 'f', categories: [], lanes: [] };
  const lane: Lane = { id: 'g', cards: [] };

  store.set(produce(actions.set('board')(board)));
  store.set(produce(actions.set('lane')(lane)));
  store.set(produce(actions.push('board')('lanes')(board.id)(lane.id)));

  store.set(produce(actions.pull('board')('lanes')(board.id)(lane.id)));
  t.equal(store.current.entity.board[board.id].lanes.length, 0, 'removes item');

  t.end();
});

test('[entity.order] moves item within list', t => {
  const store = createStore();
  const lane: Lane = { id: 'lane', cards: [] };

  store.set(produce(actions.set('lane')(lane)));
  store.set(produce(draft => {
    Array.from({ length: 5 }).forEach((_, i) => {
      const id = String.fromCharCode(65 + i);

      actions.set('card')({
        id,
        categories: [],
        tasks: []
      })(draft);
      actions.push('lane')('cards')(lane.id)(id)(draft);
    });
  }));
  
  // [a, b, c, d, e] => [a, c, d, e, b]
  store.set(produce(actions.order('lane')('cards')(lane.id)('B')(4)));
  t.deepEqual(
    store.current.entity.lane[lane.id].cards,
    ['A', 'C', 'D', 'E', 'B'],
    'moves item'
  );

  t.end();
});

test('[entity.move] moves item between lists', t => {
  const store = createStore();
  const laneA: Lane = { id: 'a', cards: [] };
  const laneB: Lane = { id: 'b', cards: [] };

  store.set(produce(actions.set('lane')(laneA)));
  store.set(produce(actions.set('lane')(laneB)));
  store.set(produce(draft => {
    Array.from({ length: 5 }).forEach((_, i) => {
      const id = String.fromCharCode(65 + i);

      actions.set('card')({
        id,
        categories: [],
        tasks: []
      })(draft);
      actions.push('lane')('cards')(laneA.id)(id)(draft);
    });
  }));

  store.set(produce(actions.move('lane')('cards')(laneA.id)(laneB.id)('B')));
  t.equal(Object.keys(store.current.entity.lane[laneA.id].cards).length, 4, 'removes from lane');
  t.false(store.current.entity.lane[laneA.id].cards.includes('B'), 'removes item');
  t.equal(Object.keys(store.current.entity.lane[laneB.id].cards).length, 1, 'adds to lane');
  t.true(store.current.entity.lane[laneB.id].cards.includes('B'), 'adds item');

  t.end();
});

test('[entity.remove] removes entity', t => {
  const store = createStore();
  const lane: Lane = { id: 'd', cards: [] };

  store.set(produce(actions.set('lane')(lane)));

  store.set(produce(actions.remove('lane')(lane.id)));
  t.equal(Object.keys(store.current.entity.lane).length, 0, 'deletes entity');

  t.end();
});

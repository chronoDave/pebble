import { produce } from 'immer';
import type { Card, Lane } from '../../store/entities';

import store, { selector } from '../../store/store';
import * as actions from '../../store/actions';
import uid from '../../lib/string/uid';

export default selector<string, Lane | null>(
  state => id => state?.entity.lane[id] ?? null
);

export const setTitle = (lane: Lane) =>
  (title: string) => {
    if (title !== lane.title) {
      store.set(produce(actions.lane.setTitle(lane.id)(title)));
    }
  };

export const createCard = (lane: string) =>
  (position: 'start' | 'end') => {
    const card: Card = { id: uid(), tasks: [], categories: [] };

    store.set(produce(draft => {
      actions.card.create(card)(draft);

      if (position === 'start') actions.lane.unshiftCard(lane)(card.id)(draft);
      if (position === 'end') actions.lane.pushCard(lane)(card.id)(draft);
    }));
  };

export const removeCard = (lane: string) =>
  (card: string) => {
    store.set(produce(draft => {
      actions.card.remove(card)(draft);
      actions.lane.removeCard(lane)(card)(draft);
    }));
  };

export const moveLeft = (id: { board: string; lane: string }) => {
  const board = store.current.entity.board[id.board];

  if (board.lanes.indexOf(id.lane) > 0) {
    store.set(produce(draft => {
      actions.lane.move(id.lane)({ n: -1 })(draft);
      actions.active.collapse(null)(draft);
    }));
  }
};

export const moveRight = (id: { board: string; lane: string }) => {
  const board = store.current.entity.board[id.board];

  if (board.lanes.indexOf(id.lane) < board.lanes.length) {
    store.set(produce(draft => {
      actions.lane.move(id.lane)({ n: 1 })(draft);
      actions.active.collapse(null)(draft);
    }));
  }
};

export const remove = (id: { board: string; lane: string }) => {
  store.set(produce(draft => {
    actions.board.removeLane(id)(draft);
    actions.active.collapse(null)(draft);
  }));
};

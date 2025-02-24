import type { Board, Lane } from '../../store/entities';

import { produce } from 'immer';

import * as actions from '../../store/actions';
import store, { selector } from '../../store/store';
import uid from '../../lib/uid/uid';

export default selector<string, Board | null>(
  state => id => state?.entity.board[id] ?? null
);

export const createLane = (board: string) => {
  const lane: Lane = { id: uid(), cards: [] };

  store.set(produce(draft => {
    actions.lane.create(lane)(draft);
    actions.board.addLane(board)(lane.id)(draft);
  }));
};

export const moveLane = (lane: string) =>
  (to: { lane?: string; board?: string }) => {
    store.set(produce(actions.lane.move(lane)(to)));
  };

export const moveCard = (card: string) =>
  (to: { card?: string; lane?: string }) => {
    store.set(produce(actions.card.move(card)(to)));
  };

export const moveCardUp = (card: string) => {
  store.set(produce(actions.card.move(card)({ n: -1 })));
};

export const moveCardDown = (card: string) => {
  store.set(produce(actions.card.move(card)({ n: 1 })));
};

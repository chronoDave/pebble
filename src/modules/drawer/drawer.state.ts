import type { Board } from '../../store/entities';

import { produce } from 'immer';

import store, { selector } from '../../store/store';
import uid from '../../lib/uid/uid';

export default selector(state => () => !!state?.active.drawer);

export const close = () => store.set(produce(draft => {
  draft.active.drawer = false;
}));

export const addBoard = () => store.set(produce(draft => {
  const board: Board = {
    id: uid(),
    title: `New board ${Object.keys(draft.entity.board).length + 1}`,
    lanes: []
  };

  draft.entity.board[board.id] = board;
}));

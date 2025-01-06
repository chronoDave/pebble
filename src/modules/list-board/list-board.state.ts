import { produce } from 'immer';
import store, { selector } from '../../store/store';

export default selector(state => () => {
  const active = state?.active.board ?? null;
  const boards = Object.values(state?.entity.board ?? []).map(board => ({
    id: board.id,
    title: board.title ?? null
  }));

  return { active, boards };
});

export const setActive = (id: string) => store.set(produce(draft => {
  draft.active.board = id;
  draft.active.drawer = false;
}));

export const removeBoard = (id: string) => store.set(produce(draft => {
  if (draft.active.board === id) delete draft.active.board;
  delete draft.entity.board[id];
}));

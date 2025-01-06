import { produce } from 'immer';
import store, { selector } from '../../../../store/store';

export const setTitle = (id: string, title: string) => {
  store.set(produce(draft => {
    draft.entity.board[id].title = title;
  }));
};

export default selector<never, { id: string | null; title: string | null }>(state => () => {
  const id = state?.active.board ?? null;
  const title = typeof id === 'string' ?
    state?.entity.board[id]?.title ?? null :
    null;

  return { id, title };
});

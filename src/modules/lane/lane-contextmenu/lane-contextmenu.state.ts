import { produce } from 'immer';
import store, { selector } from '../../../store/store';
import * as actions from '../../../store/actions';

export default selector(state => (id: string) => state?.active.collapse === id);

export const set = (collapse: string | null) => {
  store.set(produce(actions.active.collapse(collapse)));
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

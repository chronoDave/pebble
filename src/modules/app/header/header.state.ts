import type { Board, Lane } from '../../../store/entities';

import { produce } from 'immer';
import * as actions from '../../../store/actions';
import uid from '../../../lib/uid/uid';
import store, { selector } from '../../../store/store';

export default selector(state => () => state?.active.board ?? null);

export const create = () => {
  store.set(produce(draft => {
    const lane: Lane = {
      id: uid(),
      cards: []
    };

    const board: Board = {
      id: uid(),
      title: 'New board',
      lanes: [lane.id]
    };

    actions.board.create(board)(draft);
    actions.lane.create(lane)(draft);
    actions.active.board(board.id)(draft);
  }));
};

export const openDrawer = () => store.set(produce(draft => {
  draft.active.drawer = true;
}));

import h from '@chronocide/hyper';
import { produce } from 'immer';

import * as selector from '../../state/selector.ts';
import store from '../../state/store.ts';
import * as create from '../../state/actions/create.ts';

import { plus } from '../../components/icon/icon.ts';

import listLane from '../list/list-lane.ts';

import './board.scss';

export default (id: string) => {
  const board = selector.board(store.state)(id);
  if (!board) throw new Error(`Invalid board id: ${id}`);

  const addLane = h('button')({ type: 'button' })(plus(), 'Add lane');
  addLane.addEventListener('click', () => {
    store.set(produce(create.lane(id)));
  }, { passive: true });

  return h('article')({ id, class: 'board' })(
    h('h2')()(board.title),
    h('div')({ class: 'body' })(
      listLane(board),
      addLane
    )
  );
};

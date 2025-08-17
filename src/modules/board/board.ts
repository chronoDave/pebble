import h from '@chronocide/hyper';

import * as selector from '../../state/selector.ts';
import store from '../../state/store.ts';
import laneList from './components/board-lane-list.ts';
import laneAdd from './components/board-lane-add.ts';

import './board.scss';

export default (id: string) => {
  const board = selector.board(store.state)(id);
  if (!board) throw new Error(`Invalid board id: ${id}`);

  return h('article')({ class: 'board' })(
    h('h2')()(board.title),
    h('div')({ class: 'body' })(
      laneList(board),
      laneAdd(board.id)
    )
  );
};

import h from '@chronocide/hyper';

import store from '../../state/store.ts';
import board from '../board/board.ts';

const main = h('main')()('No board selected');

store.on(({ previous, current }) => {
  if (
    previous?.active !== current.active &&
    typeof current.active === 'string'
  ) main.replaceChildren(board(current.board[current.active]));
});

export default main;

import h from '@chronocide/hyper';

import { subscribe } from '../../state/store.ts';
import board from '../board/board.ts';

import './main.scss';

const main = h('main')()('No board selected');

subscribe((cur, prev) => prev?.active !== cur.active)(cur => {
  if (typeof cur.active !== 'string') return

  main.replaceChildren(board(cur.active));
});

export default main;

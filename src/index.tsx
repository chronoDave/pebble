import * as forgo from 'forgo';

import Header from './components/header/header';
import Board from './components/board/board';
import Drawer from './components/drawer/drawer';
import createDragFocus from './lib/dragFocus/dragFocus';

import './index.scss';

createDragFocus();
forgo.mount([
  <Header />,
  <main>
    <Board />
    <Drawer />
  </main>
], document.body);

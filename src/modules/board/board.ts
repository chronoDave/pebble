import type { Component } from '@chronocide/hyper'
import type { Board } from '../../state/schema.ts';

import h from '@chronocide/hyper';

import laneButton from './components/board-lane-button.ts';
import laneList from './components/board-lane-list.ts';

const component: Component<Board> = board => h('article')()(
  h('h2')()(board.title),
  laneList,
  laneButton
);

export default component;

import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import selector from './drawer-board-title.state';

export type DrawerBoardTitleProps = {
  id: string;
};

const DrawerBoardTitle: Component<DrawerBoardTitleProps> = initial => {
  const component = new forgo.Component<DrawerBoardTitleProps>({
    render(props) {
      return selector.state(props.id);
    }
  });

  selector.subscribe(initial.id)(component);

  return component;
};

export default DrawerBoardTitle;

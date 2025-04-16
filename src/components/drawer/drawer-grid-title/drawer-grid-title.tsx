import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import selector from './drawer-grid-title.state';

export type DrawerBoardGridProps = {
  id: string;
};

const DrawerGridTitle: Component<DrawerBoardGridProps> = initial => {
  const component = new forgo.Component<DrawerBoardGridProps>({
    render(props) {
      return selector.state(props.id);
    }
  });

  selector.subscribe(initial.id)(component);

  return component;
};

export default DrawerGridTitle;

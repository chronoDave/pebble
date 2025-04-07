import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import State from './drawer.state';

import './drawer.scss';

export type DrawerProps = {
  id: string;
};

const Drawer: Component<DrawerProps> = initial => {
  const state = new State<DrawerProps>(initial.id);
  const component = new forgo.Component<DrawerProps>({
    render(props) {
      return (
        <aside
          id={props.id}
          role="dialog"
          aria-modal="true"
          aria-hidden={!state.open}
          aria-labelledby={`${props.id}-title`}
          class="drawer"
          onclick={event => {
            const button = (event.target as Element | null)?.closest('button');
            if (button?.dataset.action === 'close') state.open = false;
          }}
        >
          <div class="body">
            {props.children}
          </div>
        </aside>
      );
    }
  });

  state.subscribe(component);

  return component;
};

export default Drawer;

import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import { produce } from 'immer';

import store from '../../store/store';

import selector from './drawer.state';
import * as actions from './drawer.actions';

import './drawer.scss';

export type DrawerProps = {
  id: string;
};

const Drawer: Component<DrawerProps> = initial => {
  const component = new forgo.Component<DrawerProps>({
    render(props) {
      const open = selector.state(props.id);

      return (
        <aside
          id={props.id}
          role="dialog"
          aria-modal="true"
          aria-hidden={!open}
          aria-labelledby={`${props.id}-title`}
          class="drawer"
          onclick={event => {
            const button = (event.target as Element | null)?.closest('button');
            if (button?.dataset.action === 'close') store.set(produce(actions.close));
          }}
        >
          <div class="body">
            {props.children}
          </div>
        </aside>
      );
    }
  });

  selector.subscribe(initial.id)(component);

  return component;
};

export default Drawer;

import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import { produce } from 'immer';

import Icon from '../icon/icon';
import { subscribe } from '../../lib/component';
import join from '../../lib/fn/join';
import store from '../../store/store';

import DrawerBoard from './drawer-board/drawer-board';
import selector from './drawer.state';
import * as actions from './drawer.actions';
import './drawer.scss';

export type DrawerProps = {};

const Drawer: Component<DrawerProps> = () => {
  const component = new forgo.Component<DrawerProps>({
    render() {
      const open = selector.state();

      return (
        <aside
          id='drawer'
          role="dialog"
          aria-modal="true"
          aria-hidden={!open}
          aria-labelledby='drawer-title'
          class="drawer"
        >
          <div class="body">
            <h1 id='drawer-title'>Pebble</h1>
            <DrawerBoard />
            <button
              type='button'
              onclick={() => store.set(produce(actions.add))}
            >
              <Icon id='plus' />
              Add board
            </button>
          </div>
        </aside>
      );
    }
  });

  join(
    selector.subscribe(),
    subscribe('keyup', event => {
      if (event.key === 'Escape') store.set(produce(actions.close));
    })
  )(component);

  return component;
};

export default Drawer;

import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import selector, { addBoard, close } from './drawer.state';
import Icon from '../../components/icon/icon';
import ListBoard from '../list-board/list-board';

import './drawer.scss';

export type DrawerProps = {};

const Drawer: Component<DrawerProps> = () => {
  const component = new forgo.Component<DrawerProps>({
    render() {
      const open = selector.state();

      return (
        <aside
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
          class="drawer"
          data-visible={open}
        >
          <div class="body">
            <section>
              <div class="title">
                <h1 id="drawer-title">
                  <svg aria-hidden="true" class='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path class="fg" d="M11 21H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h6v18zm2 0h6c1.1 0 2-.9 2-2v-7h-8v9zm8-11V5c0-1.1-.9-2-2-2h-6v7h8z" />
                  </svg>
                  <span>Pebble</span>
                </h1>
                <button type="button" onclick={close}>
                  <Icon id='xmark' />
                  <span class='sr-only'>Close drawer</span>
                </button>
              </div>
              <h2>Boards</h2>
              <ListBoard />
              <button type="button" onclick={addBoard}>
                <Icon id='plus' />
                <span>Add board</span>
              </button>
            </section>
            <footer>
              <p>Pebble is <a href="https://github.com/chronoDave/pebble">free to use and open source</a>. All data is stored on your device, offline.</p>
              <p>Created by <a href="https://github.com/chronoDave">Chronocide</a></p>
            </footer>
          </div>
        </aside>
      );
    }
  });

  selector.subscribe()(component);

  return component;
};

export default Drawer;

import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import { produce } from 'immer';

import Icon from '../icon/icon';

import DrawerGrid from './drawer-grid/drawer-grid';
import * as actions from './drawer.actions';
import './drawer.scss';

export type DrawerProps = {};

const Drawer: Component<DrawerProps> = () => {
  const component = new forgo.Component<DrawerProps>({
    render() {
      return (
        <dialog
          id='drawer'
          class='drawer'
          role="dialog"
          aria-labelledby='drawer-title'
        >
          <header>
            <img src='./icons/logo.svg' width={32} height={32} />
            <h1>Pebble</h1>
            <button
              type='button'
              autofocus
              onclick={event => event.currentTarget.closest('dialog')?.close()}
            >
              <Icon id='xmark' />
              <span class='sr-only'>Close</span>
            </button>
          </header>
          <section>
            <h2 id='drawer-board-title'>Boards</h2>
            <DrawerGrid />
            <button
              type='button'
              onclick={() => window.store.set(produce(actions.add))}
            >
              <Icon id='plus' />
              Add board
            </button>
          </section>
          <footer>
            <p>Created by <a href="https://chronocide.neocities.org/">Chronocide</a>. Source available on <a href="https://github.com/chronoDave/pebble">GitHub</a>.</p>
          </footer>
        </dialog>
      );
    }
  });

  return component;
};

export default Drawer;

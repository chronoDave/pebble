import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import { produce } from 'immer';

import Icon from '../../icon/icon';
import Grid from '../../grid/grid';
import DrawerGridTitle from '../drawer-grid-title/drawer-grid-title';

import selector from './drawer-grid.state';
import * as actions from './drawer-grid.actions';
import './drawer-grid.scss';

export type DrawerGrid = {};

const DrawerGrid: Component<DrawerGrid> = () => {
  const component = new forgo.Component<DrawerGrid>({
    render() {
      const state = selector.state();

      return (
        <Grid
          id='drawer-grid'
          rows={state.boards.map((board, i) => ({
            id: board,
            active: board === state.active,
            columns: [
              <button type='button' data-action='select' tabindex={i === 0 ? 0 : -1}>
                <DrawerGridTitle id={board} />
              </button>,
              <button type='button' data-action='delete' tabindex={-1}>
                <span class='sr-only'>Remove</span>
                <Icon id='trash' />
              </button>
            ]
          }))}
        >
          <p>No boards found</p>
        </Grid>
      );
    }
  });

  component.mount(() => {
    document.getElementById('drawer-grid')?.addEventListener('click', event => {
      const root = event.target as HTMLElement | null;
      if (!root) return;

      const id = root.closest('[role="row"]')?.id;
      if (typeof id !== 'string') return;

      const action = root.dataset.action ?? root.closest('button')?.dataset.action;
      if (action === 'select') window.store.set(produce(actions.active(id)));
      if (action === 'delete') {
        window.store.set(produce(actions.remove(id)));
        actions.focus(event.currentTarget as HTMLElement)(root);
      }
    }, { passive: true });
  });

  selector.subscribe()(component);

  return component;
};

export default DrawerGrid;

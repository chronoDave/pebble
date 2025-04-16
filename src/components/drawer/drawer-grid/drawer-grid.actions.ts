import type { Draft } from 'immer';
import type { State } from '../../../store/schema';

import * as actions from '../../../store/actions/entity/board';
import { board } from '../../../store/actions/active';
import * as grid from '../../grid/grid.actions';
import clamp from '../../../lib/math/clamp';

export const remove = (id: string) =>
  (draft: Draft<State>) => {
    actions.remove(id)(draft);

    const next = Object.keys(draft.entity.board).pop();
    if (typeof next === 'string') board(next)(draft);
  };

export const active = board;

export const focus = (root: Element) =>
  (prev: Element) => {
    prev.setAttribute('tabindex', '-1');

    const i = clamp(1, grid.rowcount(root), grid.rowindex(prev)) - 1;
    const row = root.querySelectorAll('[role="row"]').item(i);

    grid.focus(grid.colindex(prev) - 1)(row);
  };

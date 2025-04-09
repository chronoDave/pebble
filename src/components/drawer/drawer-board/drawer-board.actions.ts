import type { Draft } from 'immer';
import type { State } from '../../../store/schema';

import * as actions from '../../../store/actions/entity/board';
import { board } from '../../../store/actions/active';
import wrap from '../../../lib/math/wrap';
import clamp from '../../../lib/math/clamp';

export const remove = (id: string) =>
  (draft: Draft<State>) => {
    actions.remove(id)(draft);

    const next = Object.keys(draft.entity.board).pop();
    if (typeof next === 'string') board(next)(draft);
  };

export const active = board;

export const focusRow = (i: number) =>
  (root: HTMLElement) => {
    const total = root.getAttribute('aria-rowcount');
    if (typeof total !== 'string') throw new Error('Missing aria-rowcount');

    const row = root.querySelector('[tabindex="0"]')
      ?.closest('[role="row"]')
      ?.getAttribute('aria-rowindex');
    if (typeof row !== 'string') throw new Error('Missing aria-rowindex');

    const prev = root.querySelector('[tabindex="0"]');
    prev?.setAttribute('tabindex', '-1');

    const col = prev?.closest('[aria-colindex]')?.getAttribute('aria-colindex');
    if (typeof col !== 'string') throw new Error('Missing aria-colindex');

    const cur = root.querySelectorAll('[role="row"]')
      .item(wrap(0, +total - 1, +row + i - 1))
      .querySelector<HTMLElement>(`[aria-colindex="${col}"] [tabindex="-1"]`);
    cur?.setAttribute('tabindex', '0');
    cur?.focus();
  };

export const focusRowUp = focusRow(-1);
export const focusRowDown = focusRow(1);

export const focusColumn = (i: number) =>
  (root: HTMLElement) => {
    const prev = root.querySelector('[tabindex="0"]');
    prev?.setAttribute('tabindex', '-1');

    const row = prev?.closest('[role="row"]');
    const total = row?.getAttribute('aria-colcount');
    if (typeof total !== 'string') throw new Error('Missing aria-colcount');

    const col = prev?.closest('[role="gridcell"]')?.getAttribute('aria-colindex');
    if (typeof col !== 'string') throw new Error('Missing aria-colindex');

    const cur = row?.querySelectorAll<HTMLElement>('[tabindex="-1"]')
      .item(wrap(0, +total - 1, +col + i - 1));
    cur?.setAttribute('tabindex', '0');
    cur?.focus();
  };

export const focusColumnLeft = focusColumn(-1);
export const focusColumnRight = focusColumn(1);

export const focusDelete = (target: HTMLElement, root: HTMLElement) => {
  const row = target.closest('[aria-rowindex]')?.getAttribute('aria-rowindex');
  if (typeof row !== 'string') return;

  const col = target.closest('[aria-colindex]')?.getAttribute('aria-colindex');
  if (typeof col !== 'string') return;

  root.querySelector('[tabindex="0"]')?.setAttribute('tabindex', '-1');
  const rows = Array.from(root.querySelectorAll('[role="row"]'));
  const cur = rows[clamp(0, rows.length - 1, +row - 1)]?.querySelector<HTMLElement>(`[aria-colindex="${+col}"] [tabindex]`);

  cur?.setAttribute('tabindex', '0');
  cur?.focus();
};

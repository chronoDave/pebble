import * as dom from '../../lib/dom';
import clamp from '../../lib/math/clamp';

/**
 * @param i Absolute column index
*/
export const focus = (i: number) =>
  (row?: Element | null) => {
    const button = row?.querySelectorAll<HTMLButtonElement>('[tabindex]')
      .item(i);

    if (!button) throw new Error(`Unable to find button at index: ${i}`);

    button.setAttribute('tabindex', '0');
    button.focus();
  };

export const previous = (root: Element) => {
  const element = root.querySelector<HTMLButtonElement>('[tabindex="0"]');
  element?.setAttribute('tabindex', '-1');

  return element;
};

export const attribute = (key: string) =>
  (root?: Element | null) =>
    +dom.attribute(key)(root?.closest(`[${key}]`));

export const rowcount = (root?: Element | null) => +dom.attribute('aria-rowcount')(root);
export const rowindex = attribute('aria-rowindex');
export const colindex = attribute('aria-colindex');
export const colcount = attribute('aria-colcount');

/**
 * @param n Relative column index
 */
export const column = (n: number) =>
  (root: Element) => {
    const prev = previous(root);
    const i = clamp(1, colcount(prev), colindex(prev) + n) - 1;
    const row = prev?.closest('[role="row"]');

    focus(i)(row);
  };

/**
 * @param n Relative row index
 */
export const row = (n: number) =>
  (root: Element) => {
    const prev = previous(root);
    const i = clamp(1, rowcount(root), rowindex(prev) + n) - 1;
    const row = root.querySelectorAll<HTMLDivElement>('[role="row"]').item(i);

    focus(colindex(prev) - 1)(row);
  };

export const first = (root: Element) => {
  const prev = previous(root);
  const row = root.querySelector('[role="row"]:first-child');

  focus(colindex(prev) - 1)(row);
};

export const last = (root: Element) => {
  const prev = previous(root);
  const row = root.querySelector('[role="row"]:last-child');

  focus(colindex(prev) - 1)(row);
};

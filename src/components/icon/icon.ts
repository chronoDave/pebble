import { svg } from '@chronocide/hyper';

import './icon.scss';

export type Icon = {
  id: string;
  viewBox: string;
  d: string;
};

const create = (icon: Icon) =>
  () => svg('svg')({
    'xmlns': 'http://www.w3.org/2000/svg',
    'viewBox': icon.viewBox,
    'aria-hidden': 'true',
    'data-icon': icon.id
  })(
    svg('path')({ d: icon.d })()
  );

/**
 * @copyright Fonticons, Inc.
 * @see https://fontawesome.com/icons/bars
 */
export const bars = create({
  id: 'bars',
  viewBox: '0 0 448 512',
  d: 'M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z'
});

/**
 * @copyright Fonticons, Inc.
 * @see https://fontawesome.com/icons/xmark
 */
export const xmark = create({
  id: 'xmark',
  viewBox: '0 0 384 512',
  d: 'M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z'
});

/**
 * @copyright Fonticons, Inc.
 * @see https://fontawesome.com/icons/plus
 */
export const plus = create({
  id: 'plus',
  viewBox: '0 0 448 512',
  d: 'M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z'
});

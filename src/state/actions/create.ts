import type { Card, State } from '../schema.ts';
import type { Draft } from 'immer';

import { uid } from '../../lib/string.ts';

export const card = (): Card => {
  const id = uid();

  return { id, title: 'New card' };
};

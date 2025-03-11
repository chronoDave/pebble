import { produce } from 'immer';
import type { Card } from '../../store/entities';

import store, { selector } from '../../store/store';
import * as actions from '../../store/actions';

export default selector<string, Card | null>(
  state => id => state?.entity.card[id] ?? null
);

export const setTitle = (card: string) =>
  (title: string) => {
    store.set(produce(actions.card.setTitle(card)(title)));
  };

export const setDescription = (card: string) =>
  (description: string) => {
    store.set(produce(actions.card.setDescription(card)(description)));
  };

export const removeCategory = (card: string) =>
  (category: string) => {
    store.set(produce(actions.card.removeCategory(card)(category)));
  };

import type { State } from './schema';

export const tasks = (card: string) =>
  (draft: State) =>
    Object.values(draft.entity.task)
      .filter(task => task.card === card);

export const cards = (lane: string) =>
  (draft: State) =>
    Object.values(draft.entity.card)
      .filter(card => card.lane === lane);

export const lanes = (board: string) =>
  (draft: State) =>
    Object.values(draft.entity.lane)
      .filter(lane => lane.board === board);

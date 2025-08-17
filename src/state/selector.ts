import type {
  State,
  Board,
  Lane,
  Card
} from './schema.ts';

export const board = (state: State) =>
  (id: string): Board | null =>
    state.board[id] ?? null;

export const lane = (state: State) =>
  (id: string): Lane | null =>
    state.lane[id] ?? null;

export const lanes = (state: State) =>
  (id: string): Lane[] => (board(state)(id)?.lanes ?? [])
    .reduce<Lane[]>((acc, cur) => {
      const x = lane(state)(cur);
      if (x) acc.push(x);

      return acc;
    }, []);

export const card = (state: State) =>
  (id: string): Card | null =>
    state.card[id] ?? null;

export const cards = (state: State) =>
  (id: string): Card[] => (lane(state)(id)?.cards ?? [])
    .reduce<Card[]>((acc, cur) => {
      const x = card(state)(cur);
      if (x) acc.push(x);

      return acc;
    }, []);

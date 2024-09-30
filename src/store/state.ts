import { z } from 'zod';

import {
  card,
  lane,
  board,
  task
} from './entities';

const id = {
  board: crypto.randomUUID(),
  lane: crypto.randomUUID(),
  card: crypto.randomUUID(),
  task: crypto.randomUUID()
};

export const state = z.object({
  entity: z.object({
    board: z.record(z.string(), board),
    lane: z.record(z.string(), lane),
    card: z.record(z.string(), card),
    task: z.record(z.string(), task)
  })
    .default({
      task: {
        [id.task]: {
          id: id.task, title: 'New task'
        }
      },
      card: {
        [id.card]: {
          id: id.card, title: 'New card', tasks: [id.task]
        }
      },
      lane: {
        [id.lane]: {
          id: id.lane, title: 'New lane', cards: [id.card]
        }
      },
      board: {
        [id.board]: {
          id: id.board, title: 'New board', lanes: [id.lane]
        }
      }
    }),
  active: z.object({
    board: z.string().optional(),
    menu: z.string().optional()
  })
    .default({
      board: id.board
    })
});

export type State = z.infer<typeof state>;

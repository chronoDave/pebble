import type { Draft } from 'immer';
import type { State } from '../../schema';
import type { Only } from '../../../lib/types';

export const set = <T extends keyof State['entity']>(type: T) =>
  (entity: State['entity'][T][string]) =>
    (draft: Draft<State>) => {
      draft.entity[type][entity.id] = entity;
    };

export const string = <T extends keyof State['entity']>(type: T) =>
  <P extends Only<State['entity'][T][string], string | undefined>>(property: P) =>
    (id: string) =>
      (value?: string) =>
        (draft: Draft<State>) => {
          if (typeof value === 'string') {
            // @ts-expect-error: TS2536, P is already type narrowed and guaranteed to be a valid property
            draft.entity[type][id][property] = value;
          } else {
            // @ts-expect-error: TS2536, P is already type narrowed and guaranteed to be a valid property
            delete draft.entity[type][id][property];
          }
        };

export const boolean = <T extends keyof State['entity']>(type: T) =>
  <P extends Only<State['entity'][T][string], boolean | undefined>>(property: P) =>
    (id: string) =>
      (value?: boolean) =>
        (draft: Draft<State>) => {
          if (typeof value === 'boolean') {
            // @ts-expect-error: TS2536, P is already type narrowed and guaranteed to be a valid property
            draft.entity[type][id][property] = value;
          } else {
            // @ts-expect-error: TS2536, P is already type narrowed and guaranteed to be a valid property
            draft.entity[type][id][property] = !draft.entity[type][id][property];
          }
        };

export const push = <T extends keyof State['entity']>(type: T) =>
  <P extends Only<State['entity'][T][string], string[]>>(property: P) =>
    (id: string) =>
      (key: string) =>
        (draft: Draft<State>) => {
          // @ts-expect-error: TS2536, P is already type narrowed and guaranteed to be a valid property
          draft.entity[type][id][property].push(key);
        };

export const pull = <T extends keyof State['entity']>(type: T) =>
  <P extends Only<State['entity'][T][string], string[]>>(property: P) =>
    (id: string) =>
      (key: string) =>
        (draft: Draft<State>) => {
          // @ts-expect-error: TS2536, P is already type narrowed and guaranteed to be a valid property
          const set = new Set(draft.entity[type][id][property]);
          set.delete(key);
          // @ts-expect-error: TS2536, P is already type narrowed and guaranteed to be a valid property
          draft.entity[type][id][property] = Array.from(set);
        };

export const order = <T extends keyof State['entity']>(type: T) =>
  <P extends Only<State['entity'][T][string], string[]>>(property: P) =>
    (id: string) =>
      (key: string) =>
        (to: number) =>
          (draft: Draft<State>) => {
            // @ts-expect-error: TS2536, P is already type narrowed and guaranteed to be a valid property
            const n = draft.entity[type][id][property].indexOf(key);
            // @ts-expect-error: TS2536, P is already type narrowed and guaranteed to be a valid property
            (draft.entity[type][id][property] as string[]).splice(n, 1);
            // @ts-expect-error: TS2536, P is already type narrowed and guaranteed to be a valid property
            (draft.entity[type][id][property] as string[]).splice(to, 0, key);
          };

export const move = <T extends keyof State['entity']>(type: T) =>
  <P extends Only<State['entity'][T][string], string[]>>(property: P) =>
    (from: string) =>
      (to: string) =>
        (key: string) =>
          (draft: Draft<State>) => {
            pull(type)(property)(from)(key)(draft);
            push(type)(property)(to)(key)(draft);
          };

export const remove = <T extends keyof State['entity']>(type: T) =>
  (id: string) =>
    (draft: Draft<State>) => {
      delete draft.entity[type][id];
    };

export default <T extends keyof State['entity']>(type: T) => ({
  set: set(type),
  string: string(type),
  boolean: boolean(type),
  push: push(type),
  pull: pull(type),
  order: order(type),
  move: move(type),
  remove: remove(type)
});

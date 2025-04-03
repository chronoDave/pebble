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

export const remove = <T extends keyof State['entity']>(type: T) =>
  (id: string) =>
    (draft: Draft<State>) => {
      delete draft.entity[type][id];
    };

export default <T extends keyof State['entity']>(type: T) => ({
  set: set(type),
  string: string(type),
  boolean: boolean(type),
  remove: remove(type)
});

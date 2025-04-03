import uid from '../../../lib/string/uid';
import actions from './entity';

const entity = actions('card');

export const {
  set,
  remove,
  push,
  pull,
  order,
  move
} = entity;
export const create = entity.set({
  id: uid(),
  title: 'New card',
  tasks: [],
  categories: []
});
export const title = entity.string('title');
export const description = entity.string('description');

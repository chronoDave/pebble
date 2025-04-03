import uid from '../../../lib/string/uid';
import actions from './entity';

const entity = actions('task');

export const { set, remove } = entity;
export const create = entity.set({ id: uid(), title: 'New task' });
export const title = entity.string('title');
export const done = entity.boolean('done');

import uid from '../../../lib/string/uid';
import actions from './entity';

const entity = actions('lane');

export const { set, remove } = entity;
export const create = entity.set({ id: uid(), title: 'New lane' });
export const title = entity.string('title');

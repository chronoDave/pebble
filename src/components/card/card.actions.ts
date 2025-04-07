import * as entity from '../../store/actions/entity';

export const title = entity.string('card')('title');
export const description = entity.string('card')('description');

export const category = (id: string) => ({
  pull: (category: string) =>
    entity.pull('card')('categories')(id)(category)
});

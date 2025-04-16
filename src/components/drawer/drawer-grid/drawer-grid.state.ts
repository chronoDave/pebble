export type State = {
  boards: string[];
  active?: string;
};

export default window.store.select<never, State>(
  state => () => ({
    active: state?.active.board,
    boards: state?.entity.board ? Object.keys(state.entity.board) : []
  }),
  ({ previous, current }) => {
    if (!previous?.entity.board) return true;
    if (previous.active.board !== current.active.board) return true;
    return Object.keys(previous.entity.board).length !== Object.keys(current.entity.board).length;
  }
);

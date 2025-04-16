const event = (event: Event) =>
  (root: Element) => {
    root.dispatchEvent(event);
    return root;
  };

export default event;

export const click = event(new MouseEvent('click', {
  bubbles: true,
  cancelable: true
}));

export type KeyboardOptions = {
  shift?: boolean;
  ctrl?: boolean;
};

export const keydown = (key: string, options?: KeyboardOptions) =>
  event(new KeyboardEvent('keydown', {
    key,
    bubbles: true,
    cancelable: true,
    ctrlKey: options?.ctrl,
    shiftKey: options?.shift
  }));

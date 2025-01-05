export const canFocus = (el: HTMLElement) => {
  if (el.tabIndex < 0) return false;

  if (el instanceof HTMLAnchorElement) return !!el.href && el.rel !== 'ignore';
  if (el instanceof HTMLInputElement) return el.type !== 'hidden';
  if (
    el instanceof HTMLButtonElement ||
    el instanceof HTMLSelectElement ||
    el instanceof HTMLTextAreaElement
  ) return el.disabled;

  return false;
};

export const deepFocus = (el: HTMLElement) => {
  for (const child of el.children) {
    if (canFocus(child as HTMLElement)) {
      (child as HTMLElement).focus();
      break;
    }

    deepFocus(child as HTMLElement);
  }
};

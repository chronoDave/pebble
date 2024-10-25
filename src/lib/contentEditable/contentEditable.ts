import type { InputType } from '../../types/events/input';

const PLAIN_TYPES: InputType[] = [
  'insertText',
  'deleteContent',
  'deleteByCut',
  'deleteContentBackward',
  'deleteContentForward',
  'historyUndo',
  'historyRedo'
];

export type ContentEditable = {
  contenteditable: true;
  onbeforeinput: (event: InputEvent) => void;
  onkeydown: (event: KeyboardEvent) => void;
  onkeyup: (event: KeyboardEvent) => void;
  onpaste: (event: ClipboardEvent) => void;
  onfocus: (event: FocusEvent) => void;
};

const contentEditable: ContentEditable = {
  contenteditable: true,
  onfocus: event => {
    const root = event.currentTarget as HTMLElement;

    const range = document.createRange();
    const selection = window.getSelection();

    range.setStart(root.childNodes[0], root.textContent?.length ?? 0);
    range.collapse(true);

    selection?.removeAllRanges();
    selection?.addRange(range);

    root.focus();
  },
  onbeforeinput: event => {
    if (!(PLAIN_TYPES as string[]).includes(event.inputType)) {
      event.preventDefault();
      return;
    }
  },
  onkeydown: event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      (event.currentTarget as HTMLElement | null)?.blur();
    }
  },
  onkeyup: event => {
    const target = event.currentTarget as HTMLElement | null;

    if (target?.innerText.length === 0) target.innerHTML = '';
  },
  onpaste: event => {
    event.preventDefault();

    const raw = event.clipboardData?.getData('text');
    if (typeof raw !== 'string') return;

    const selection = window.getSelection();
    if (typeof selection?.rangeCount !== 'number' || selection.rangeCount == 0) return;

    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(raw));
    selection.collapseToEnd();
  }
};

export default contentEditable;

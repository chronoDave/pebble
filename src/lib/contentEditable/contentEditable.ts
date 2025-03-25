/** https://w3c.github.io/input-events/#interface-InputEvent-Attributes */
export type InputType =
  'insertText' |
  'insertReplacementText' |
  'insertLineBreak' |
  'insertParagraph' |
  'insertOrderedList' |
  'insertUnorderedList' |
  'insertHorizontalRule' |
  'insertFromYank' |
  'insertFromDrop' |
  'insertFromPaste' |
  'insertFromPasteAsQuotation' |
  'insertTranspose' |
  'insertCompositionText' |
  'insertLink' |
  'deleteWordBackward' |
  'deleteWordForward' |
  'deleteSoftLineBackward' |
  'deleteSoftLineForward' |
  'deleteEntireSoftLine' |
  'deleteHardLineBackward' |
  'deleteHardLineForward' |
  'deleteByDrag' |
  'deleteByCut' |
  'deleteContent' |
  'deleteContentBackward' |
  'deleteContentForward' |
  'historyUndo' |
  'historyRedo' |
  'formatBold' |
  'formatItalic' |
  'formatUnderline' |
  'formatStrikeThrough' |
  'formatSuperscript' |
  'formatSubscript' |
  'formatJustifyFull' |
  'formatJustifyCenter' |
  'formatJustifyRight' |
  'formatJustifyLeft' |
  'formatIndent' |
  'formatOutdent' |
  'formatRemove' |
  'formatSetBlockTextDirection' |
  'formatSetInlineTextDirection' |
  'formatBackColor' |
  'formatFontColor' |
  'formatFontName';

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
  onclick: (event: MouseEvent) => void;
};

const modifySelection = (event: KeyboardEvent) => (direction: 'forward' | 'backward') => {
  const selection = window.getSelection();
  if (!selection) return;

  event.preventDefault();
  selection.modify(event.shiftKey ? 'extend' : 'move', direction, event.ctrlKey ? 'word' : 'character');
};

const contentEditable: ContentEditable = {
  contenteditable: true,
  onfocus: event => {
    const root = event.currentTarget as HTMLElement;
    if (root.childNodes.length === 0) return;

    const range = document.createRange();
    const selection = window.getSelection();

    range.setStart(root.childNodes[0], root.textContent?.length ?? 0);
    range.collapse(true);

    selection?.removeAllRanges();
    selection?.addRange(range);

    root.focus();
  },
  onclick: event => {
    const root = event.currentTarget as HTMLElement;
    const text = root.childNodes[0].textContent;
    if (text === null) return;

    for (let i = 0; i < text.length; i += 1) {
      const range = document.createRange();
      range.setStart(root.childNodes[0], i);
      range.setEnd(root.childNodes[0], i + 1);
      const box = range.getBoundingClientRect();

      if (
        event.clientX > box.x && event.clientX < box.x + box.width &&
        event.clientY > box.y && event.clientY < box.y + box.height
      ) {
        const selection = window.getSelection();
        range.setEnd(root.childNodes[0], i);
        selection?.removeAllRanges();
        selection?.addRange(range);

        break;
      }
    }
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

    if (event.key === 'ArrowRight') modifySelection(event)('forward');
    if (event.key === 'ArrowLeft') modifySelection(event)('backward');
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

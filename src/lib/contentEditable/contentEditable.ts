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

import * as forgo from 'forgo';
import { JSDOM } from 'jsdom';

export default () => {
  const dom = new JSDOM();

  forgo.setCustomEnv({
    window: dom.window,
    document: dom.window.document
  });

  // @ts-expect-error: TS2322, Override global window
  global.window = dom.window;
  global.document = dom.window.document;
  global.HTMLAnchorElement = dom.window.HTMLAnchorElement;
  global.HTMLInputElement = dom.window.HTMLInputElement;
  global.HTMLButtonElement = dom.window.HTMLButtonElement;
  global.HTMLSelectElement = dom.window.HTMLSelectElement;
  global.HTMLTextAreaElement = dom.window.HTMLTextAreaElement;

  return dom;
};

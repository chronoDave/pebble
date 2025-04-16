import { JSDOM } from 'jsdom';

import createStore from '../src/store/store.fixture';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (raw: any) => {
  const { window } = new JSDOM('<body></body>', { runScripts: 'dangerously' });
  window.store = createStore();

  const script = window.document.createElement('script');
  script.textContent = raw.default;
  window.document.body.appendChild(script);
  const root = window.document.body.childNodes.item(0) as HTMLElement;

  return { window, document: window.document, root };
};

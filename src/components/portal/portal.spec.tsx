// import * as forgo from 'forgo';
// import test from 'tape';

// import portal from './portal';
// import fixture from './portal.fixture';

// test('[portal] should mount component', t => {
//   const cleanup = fixture();

//   portal(<div id="test" />);

//   t.true(document.body.querySelector('#test'));

//   cleanup();
//   t.end();
// });

// test('[portal] should unmount component', t => {
//   const cleanup = fixture();

//   const unmount = portal(<div id="test" />);
//   unmount();

//   t.false(document.body.querySelector('#test'), 'unmounts component');
//   t.false(document.body.querySelector('.portal'), 'cleans up portal');

//   cleanup();
//   t.end();
// });

// test('[portal] should unmount on click close', t => {
//   const cleanup = fixture();

//   portal(
//     <div id="test">
//       <button type="button" data-action="close">
//         Close
//       </button>
//     </div>
//   );

//   document.body.querySelector('button')?.click();

//   t.false(document.body.querySelector('#test'), 'unmounts component');
//   t.false(document.body.querySelector('.portal'), 'cleans up portal');

//   cleanup();
//   t.end();
// });

// test('[portal] should unmount on escape', t => {
//   const cleanup = fixture();

//   portal(<div id="test"></div>);

//   const event = new window.KeyboardEvent('keyup', { key: 'Escape', bubbles: true });
//   document.body.querySelector('#test')?.dispatchEvent(event);

//   t.false(document.body.querySelector('#test'), 'unmounts component');
//   t.false(document.body.querySelector('.portal'), 'cleans up portal');

//   cleanup();
//   t.end();
// });

// test('[portal] calls component unmount function', t => {
//   const cleanup = fixture();
//   let unmounted = false;

//   const Test = () => {
//     const component = new forgo.Component({
//       render() {
//         return <div id="test" />;
//       }
//     });

//     component.unmount(() => {
//       unmounted = true;
//     });

//     return component;
//   };

//   const unmount = portal(<Test />);
//   unmount();

//   t.true(unmounted);

//   cleanup();
//   t.end();
// });

// test('[portal] mounts on anchor', t => {
//   const cleanup = fixture();

//   portal(<div id="test" />, { anchor: document.querySelector('.anchor') });

//   t.true(document.body.querySelector('.portal > #test'), 'mounts component');

//   cleanup();
//   t.end();
// });

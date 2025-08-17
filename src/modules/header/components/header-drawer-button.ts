import { bars } from '../../../components/button-icon/button-icon.ts';
import drawer from '../../drawer/drawer.ts';

const button = bars('Navigation');

button.setAttribute('aria-haspopup', 'dialog');
button.addEventListener('click', () => drawer.showModal(), { passive: true });

export default button;

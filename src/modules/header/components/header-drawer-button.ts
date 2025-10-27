import buttonIcon from '../../../components/button/button-icon.ts';
import { bars } from '../../../components/icon/icon.ts';
import drawer from '../../drawer/drawer.ts';

const button = buttonIcon(bars())('Navigation');

button.setAttribute('aria-haspopup', 'dialog');
button.addEventListener('click', () => drawer.showModal(), { passive: true });

export default button;

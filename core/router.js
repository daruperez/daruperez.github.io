import { loadActualidad, loadSeccionPDF } from '../ui/renderer.js';
import { state } from './state.js';

export function initRouter() {
    document.addEventListener('click', (e) => {
        const tab = e.target.closest('[data-seccion]');
        if (!tab) return;

        e.preventDefault();

        const seccion = tab.dataset.seccion;
        state.activeSection = seccion;

        if (seccion === 'actualidad') {
            loadActualidad();
        } else {
            loadSeccionPDF(seccion);
        }
    });
}
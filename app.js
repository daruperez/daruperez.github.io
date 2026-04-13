import { initState } from './core/state.js';
import { initRouter } from './core/router.js';
import { initTabs } from './ui/tabs.js';
import { loadTitle } from './core/contentLoader.js';
import { loadActualidad } from './ui/renderer.js';

function closeAllCards() {
    document.querySelectorAll('.pdf-card.expandido').forEach(c => {
        c.classList.remove('expandido');
        c.classList.add('colapsado');
        c.querySelector('button').innerText = 'Abrir';
        c.querySelector('.visor-pdf').style.display = 'none';
    });
}

initState();

initTabs();
initRouter();

loadTitle();
loadActualidad();
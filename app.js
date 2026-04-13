import { initState } from './core/state.js';
import { initRouter } from './core/router.js';
import { initTabs } from './ui/tabs.js';
import { loadTitle } from './core/contentLoader.js';
import { loadActualidad } from './ui/renderer.js';

initState();

initTabs();
initRouter();

loadTitle();
loadActualidad();
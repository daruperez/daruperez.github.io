export const state = {
    cache: new Map(),
    activeSection: 'actualidad',
    firstLoad: true
};

export function initState() {
    console.log('Estado inicializado');
}
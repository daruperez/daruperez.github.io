const tabsData = [
    { name: 'Actualidad', id: 'actualidad' },
    { name: 'Historias', id: 'historias.pdf' },
    { name: 'Hobbies', id: 'hobbies.pdf' }
];

export function initTabs() {
    const nav = document.getElementById('tabs');

    nav.innerHTML = tabsData.map(t => `
        <a href="#" data-seccion="${t.id}">${t.name}</a>
    `).join('');

    nav.firstChild.classList.add('tab-activa');

    nav.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') return;

        [...nav.querySelectorAll('a')]
            .forEach(a => a.classList.remove('tab-activa'));

        e.target.classList.add('tab-activa');
    });
}
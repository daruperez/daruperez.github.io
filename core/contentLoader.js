export async function loadTitle() {
    const el = document.getElementById('titulo');

    try {
        const res = await fetch('titulo.txt');
        el.textContent = res.ok ? await res.text() : 'Rincón de Deivid';
    } catch {
        el.textContent = 'Rincón de Deivid';
    }
}

export async function loadJSON(file) {
    const res = await fetch(file);
    return res.ok ? await res.json() : [];
}
import { crearCard } from './ui.js';

const contenedor = document.getElementById('contenedor');
const tituloEl = document.getElementById('titulo');

export const escapeHTML = (str = '') =>
    str.replace(/[&<>"']/g, m => ({
        '&':'&amp;',
        '<':'&lt;',
        '>':'&gt;',
        '"':'&quot;',
        "'":'&#039;'
    }[m]));

export async function cargarTitulo() {
    try {
        const res = await fetch('titulo.txt');
        tituloEl.innerText =
            res.ok ? await res.text() : "El rincón de David";
    } catch {
        tituloEl.innerText = "El rincón de David";
    }
}

export async function cargarActualidad() {
    contenedor.innerHTML = '<div class="loader">Cargando...</div>';

    try {
        const res = await fetch('actualidad.json');
        let lista = await res.json();

        lista.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        contenedor.innerHTML = '';

        for (const item of lista) {
            crearCard(item, contenedor, escapeHTML);
        }

    } catch (e) {
        console.error(e);
        contenedor.innerHTML = `<div style="color:red;">Error cargando contenido</div>`;
    }
}

export async function cargarSeccionUnica(url) {
    contenedor.innerHTML = '<div class="loader">Cargando...</div>';

    const div = document.createElement('div');
    contenedor.innerHTML = '';
    contenedor.appendChild(div);

    const { renderizarPDF } = await import('./pdf.js');
    renderizarPDF(url, div);
}
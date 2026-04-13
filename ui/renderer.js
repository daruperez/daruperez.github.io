import { loadJSON } from '../core/contentLoader.js';
import { getFileType } from '../core/fileType.js';
import { renderCard } from './cards.js';
import { renderPDF } from '../utils/pdf.js';

const contenedor = document.getElementById('contenedor');

export async function loadActualidad() {
    contenedor.innerHTML = '<div class="loader">Cargando...</div>';

    const data = await loadJSON('actualidad.json');

    data.sort((a,b) => new Date(b.fecha) - new Date(a.fecha));

    contenedor.innerHTML = '';

    data.forEach(item => {
        const card = renderCard(item, async (archivo, visor) => {

            const tipo = getFileType(archivo);

            if (tipo === 'pdf') return renderPDF(archivo, visor);

            if (tipo === 'audio') {
                visor.innerHTML = `<audio controls style="width:100%"><source src="${archivo}"></audio>`;
            }

            if (tipo === 'video') {
                visor.innerHTML = `<video controls style="width:100%"><source src="${archivo}"></video>`;
            }

            if (tipo === 'image') {
                visor.innerHTML = `<img src="${archivo}" style="width:100%">`;
            }

            if (tipo === 'link') {
                visor.innerHTML = `<a href="${archivo}" target="_blank">Abrir enlace</a>`;
            }

        });

        contenedor.appendChild(card);
    });
}

export async function loadSeccionPDF(url) {
    contenedor.innerHTML = '<div class="loader">Cargando...</div>';
    await renderPDF(url, contenedor);
}
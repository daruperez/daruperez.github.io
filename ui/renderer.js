import { loadJSON } from '../core/contentLoader.js';
import { getFileType } from '../core/fileType.js';
import { renderCard } from './cards.js';
import { renderPDF } from '../utils/pdf.js';

const contenedor = document.getElementById('contenedor');

let cache = null;
let firstLoad = true;

export async function loadActualidad() {

    if (cache) {
        contenedor.innerHTML = '';
        contenedor.appendChild(cache);
        return;
    }

    contenedor.innerHTML = '<div class="loader">Cargando...</div>';

    const data = await loadJSON('actualidad.json');

    data.sort((a,b) => new Date(b.fecha) - new Date(a.fecha));

    const wrapper = document.createElement('div');

    data.forEach(item => {
        const card = renderCard(item, async (archivo, visor) => {

            const type = getFileType(archivo);

            if (type === 'pdf') return renderPDF(archivo, visor);

            if (type === 'image')
                visor.innerHTML = `<img src="${archivo}" style="width:100%">`;

            else if (type === 'video')
                visor.innerHTML = `<video controls style="width:100%"><source src="${archivo}"></video>`;

            else if (type === 'audio')
                visor.innerHTML = `<audio controls style="width:100%"><source src="${archivo}"></audio>`;

            else if (type === 'link')
                visor.innerHTML = `<a href="${archivo}" target="_blank">Abrir enlace</a>`;

            else
                visor.innerHTML = `<a href="${archivo}" target="_blank">Descargar</a>`;
        });

        wrapper.appendChild(card);
    });

    cache = wrapper;

    contenedor.innerHTML = '';
    contenedor.appendChild(wrapper);

    if (firstLoad) {
        setTimeout(() => {
            const first = document.querySelector('.pdf-card button');
            if (first) first.click();
        }, 100);
        firstLoad = false;
    }
}

export async function loadSeccionPDF(url) {
    contenedor.innerHTML = '<div class="loader">Cargando...</div>';
    await renderPDF(url, contenedor);
}
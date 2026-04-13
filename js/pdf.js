import * as pdfjsLib from 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.149/pdf.min.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc =
'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.149/pdf.worker.min.mjs';

export async function renderizarPDF(url, destino) {
    destino.innerHTML = '<div class="loader">Cargando PDF...</div>';

    try {
        const pdf = await pdfjsLib.getDocument(url).promise;
        destino.innerHTML = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            destino.appendChild(canvas);

            const viewport = page.getViewport({ scale: 1.5 });

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: ctx, viewport }).promise;
        }

    } catch (e) {
        console.error(e);
        destino.innerHTML = `<p>Error al cargar PDF</p>`;
    }
}
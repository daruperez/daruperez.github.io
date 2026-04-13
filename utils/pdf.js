import * as pdfjsLib from 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.149/pdf.min.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc =
'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.149/pdf.worker.min.mjs';

export async function renderPDF(url, container) {

    container.innerHTML = '<div class="loader">Cargando PDF...</div>';

    const pdf = await pdfjsLib.getDocument(url).promise;

    container.innerHTML = '';

    const pages = Math.min(pdf.numPages, 5);

    for (let i = 1; i <= pages; i++) {
        const page = await pdf.getPage(i);

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        container.appendChild(canvas);

        const viewport = page.getViewport({ scale: 1.5 });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: ctx, viewport }).promise;
    }
}
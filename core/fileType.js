export function getFileType(file) {
    if (/^https?:\/\//i.test(file)) return 'link';

    const ext = file.split('.').pop().toLowerCase();

    if (ext === 'pdf') return 'pdf';
    if (['mp3','wav','ogg'].includes(ext)) return 'audio';
    if (['mp4','webm','avi'].includes(ext)) return 'video';
    if (['jpg','jpeg','png','webp','gif'].includes(ext)) return 'image';

    return 'other';
}
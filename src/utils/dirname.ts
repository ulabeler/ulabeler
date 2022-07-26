import path from 'path';

export const dirname = path.dirname(new URL(import.meta.url).pathname);

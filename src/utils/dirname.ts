import path from 'path';

export function dirname(metaUrl: string): string {
	return path.dirname(new URL(metaUrl).pathname);
};

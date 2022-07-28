import {Controller, Get, Res} from 'routing-controllers';
import { Response } from 'express';
// import indexHtml from '../../../client/dist/index.html';
import {dirname} from '@utils/dirname.js';
import fs from 'fs';
import path from 'path';

@Controller('')
export class PageRouter {
	@Get('/')
	serveIndex(@Res() response: Response) {
		const indexHtmlPath = path.join(dirname(import.meta.url), '../../../client/dist/index.html');
		if (fs.existsSync(indexHtmlPath)) {
			response.sendFile(indexHtmlPath);
		} else {
			response.status(404).send('Not Found');
		}
		// response.sendFile('index.html', { root: `${path.join(dirname(import.meta.url), '../../../client/dist')}` });
	}
}

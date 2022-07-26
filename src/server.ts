import express, {RequestHandler, Router} from 'express';
import {boundMethod} from 'autobind-decorator';
import {config} from '@/config.js';
import {PrismaClient} from '@prisma/client';
export const prisma = new PrismaClient();

export class UlabelerServer {
	private readonly app: express.Application = express();
	private readonly port: number = config.port;

	constructor(middleware: Array<RequestHandler>, route: Array<Router> = []) {
		// ミドルウェアを追加
		this.setMiddleware(middleware);

		// ルーティング追加
		route.forEach((r) => {
			// this.app.use(r.path, r.router);
		});

		// 起動
		this.app.listen(this.port, () => {
			console.log(`Server listening on port ${this.port}`);
		});
	};

	@boundMethod
	private setMiddleware(middleware: Array<RequestHandler>): void {
		middleware.forEach((m) => {
			this.app.use(m);
		});
	}
};

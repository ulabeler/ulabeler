import express, {RequestHandler} from 'express';
import {boundMethod} from 'autobind-decorator';
import {config} from '@/config.js';
import {PrismaClient} from '@prisma/client';
import {Ulabeler} from './types/utils.js';
export const prisma = new PrismaClient();

export class UlabelerServer {
	private readonly app: express.Application = express();
	private readonly port: number = config.port;

	constructor(middleware: Array<RequestHandler>, routes: Array<any>) {
		// ミドルウェアを追加
		this.setMiddleware(middleware);

		// TODO: ルーティング追加
		routes.forEach((route: Ulabeler.routerRegister) => {
			this.app.use(route.basePath, route.router);
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

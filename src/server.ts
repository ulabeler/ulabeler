import express from 'express';
import {useExpressServer} from 'routing-controllers';
import {config} from '@/config.js';
import {PrismaClient} from '@prisma/client';
export const prisma = new PrismaClient();

export class UlabelerServer {
	private readonly app: express.Application = express();
	private readonly port: number = config.port;

	constructor(middleware: Array<Function> | Array<string>, routes: Array<Function> | Array<string>) {
		// TODO: ルーティング追加
		useExpressServer(this.app, {
			controllers: routes,
			middlewares: middleware,
		});

		// 起動
		this.app.listen(this.port, () => {
			console.log(`Server listening on port ${this.port}`);
		});
	};
};

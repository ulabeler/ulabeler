import express, {Router} from 'express';
import {config} from '@/config.js';
import {PrismaClient} from '@prisma/client';
export const prisma = new PrismaClient();

export class UlabelerServer {
	private readonly app: express.Application = express();
	private readonly port: number = config.port;

	constructor(route: Array<Router> = []) {
		this.app.listen(this.port, () => {
			console.log(`Server listening on port ${this.port}`);
		});
		// ミドルウェアを追加
		this.app.use(express.json());
		this.app.use(express.urlencoded({extended: true}));
		this.app.use(express.static('public'));

		// ルーティング追加
		route.forEach((r) => {
			// this.app.use(r.path, r.router);
		});
	};
};

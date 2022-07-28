import {Ulabeler} from '@/types/utils.js';
import {boundMethod} from 'autobind-decorator';
import {Request, Response, Router} from 'express';

export class TestAPIRouter2 {
	public readonly basePath: string = '/api/v2';
	private router = Router();

	constructor() {
		this.routeSet();
	}

	@boundMethod
	public install(): Ulabeler.routerRegister {
		return {
			basePath: this.basePath,
			router: this.router,
		};
	}

	@boundMethod
	private routeSet(): void {
		// この中に書いていく
		this.router.get(this.indexRoute().path, this.indexRoute().route);
		this.router.get(this.helloRoute().path, this.helloRoute().route);
	}

	/**
	 * "/"にアクセスしたときの処理
	 * @param {Request} req
	 * @param {Response} res
	 * @return {any}
	 */
	@boundMethod
	private indexRoute(): any {
		return {
			path: '/',
			route: (req: Request, res: Response) => {
				res.status(200).send('hogehoge');
			},
		};
	}

	@boundMethod
	private helloRoute(): any {
		return {
			path: '/2',
			route: (req: Request, res: Response) => {
				res.status(200).send('Hello World!');
			},
		};
	}
}

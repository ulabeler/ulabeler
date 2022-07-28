import {Ulabeler} from '@/types/utils.js';
import {boundMethod} from 'autobind-decorator';
import {Request, Response, Router} from 'express';

export class TestAPIRouter3 {
	public readonly basePath: string = '/api/v3';
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
		this.router.get('/', (req, res) => {
			this.indexRoute(req, res);
		});
		this.router.get('/2', (req, res) => {
			this.helloRoute(req, res);
		});
	}

	/**
	 * "/"にアクセスしたときの実処理
	 * @param {Request} req
	 * @param {Response} res
	 */
	@boundMethod
	private indexRoute(req: Request, res: Response): any {
		res.status(200).send('hogehoge');
	}

	@boundMethod
	private helloRoute(req: Request, res: Response): any {
		res.status(200).send('Hello World!');
	}
}

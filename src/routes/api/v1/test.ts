import {Ulabeler} from '@/types/utils.js';
import {boundMethod} from 'autobind-decorator';
import {Router} from 'express';

export class TestAPIRouter {
	public readonly basePath: string = '/api/v1';
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
		// "/"にアクセスしたときの処理
		this.router.get('/', function(req, res) {
			res.status(200).send('Hello World!');
		});

		this.router.get('/2', (req, res) => {
			res.status(200).send('Hello World!');
		});
	}
}

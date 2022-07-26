import {Ulabeler} from '@/types/utils.js';
import {boundMethod} from 'autobind-decorator';
import {Router} from 'express';

export class testAPIRouter {
	public readonly prefix: string = '/api/v1';
	private router = Router();

	constructor() {

	}

	@boundMethod
	public install(): Ulabeler.router {
		return {
			path: this.prefix,
			router: this.router,
		};
	}
}

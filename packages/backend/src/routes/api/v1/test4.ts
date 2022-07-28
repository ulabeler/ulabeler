import {Controller, Get} from 'routing-controllers';

@Controller('/api/v4')
export class TestAPIRouter4 {
	@Get('/')
	public index(): string {
		return 'Hello World!';
	}

	@Get('/2')
	public hello(): string {
		return 'hogehoge';
	}
}

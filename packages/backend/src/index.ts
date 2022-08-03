import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import {UlabelerServer} from './server.js';
import path from 'path';
import flash from 'connect-flash';
import 'reflect-metadata';
// import favicon from 'serve-favicon';
import {dirname} from '@utils/dirname.js';
// import {Ulabeler} from './types/utils.js';

// ミドルウェアを配列の形で列挙
const middleware: Array<Function> | Array<string> = [
	logger('dev'),
	bodyParser.urlencoded({extended: true, limit: '10mb'}),
	bodyParser.raw({limit: '10mb'}),
	bodyParser.json({limit: '10mb'}),
	express.json(),
	express.urlencoded({extended: false}),
	express.static(path.join(dirname(import.meta.url), '../../../client/dist')),
	flash(),
	// favicon(path.join(dirname(import.meta.url), '../files/system', 'favicon.ico')),
];

// ルーティングを配列の形で列挙
import {TestAPIRouter4} from '@routes/api/v1/test4.js';
const routes: Array<Function> | Array<string> = [
	TestAPIRouter4,
];

new UlabelerServer(middleware, routes);

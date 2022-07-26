import express, {Router} from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import {UlabelerServer} from './server.js';
import path from 'path';
import flash from 'connect-flash';
import favicon from 'serve-favicon';
import {dirname} from './utils/dirname.js';

// ミドルウェアを配列の形で列挙
const middleware = [
	logger('dev'),
	bodyParser.urlencoded({extended: true, limit: '10mb'}),
	bodyParser.raw({limit: '10mb'}),
	bodyParser.json({limit: '10mb'}),
	express.json(),
	express.urlencoded({extended: false}),
	express.static(path.join(dirname(import.meta.url), '../files/public')),
	flash(),
	favicon(path.join(dirname(import.meta.url), '../files/system', 'favicon.ico')),
];

// ルーティングを配列の形で列挙
// TODO: どうやるか未定なので型はとりあえず適当な感じに
const routes: Array<Router> = [];

new UlabelerServer(middleware, routes);

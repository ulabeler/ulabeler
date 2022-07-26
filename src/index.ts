import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import {UlabelerServer} from './server.js';
import path from 'path';
import flash from 'connect-flash';
import favicon from 'serve-favicon';

const middleware = [
	logger('dev'),
	bodyParser.urlencoded({extended: true, limit: '10mb'}),
	bodyParser.raw({limit: '10mb'}),
	bodyParser.json({limit: '10mb'}),
	express.json(),
	express.urlencoded({extended: false}),
	express.static(path.join(path.dirname(new URL(import.meta.url).pathname), '../files/public')),
	flash(),
	favicon(path.join(path.dirname(new URL(import.meta.url).pathname), '../files/system', 'favicon.ico')),
];

new UlabelerServer(middleware);

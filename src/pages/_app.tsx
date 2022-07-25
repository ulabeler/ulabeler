/* eslint-disable require-jsdoc */
import '../styles/globals.css';
import type {AppProps} from 'next/app.js';

function MyApp({Component, pageProps}: AppProps) {
	return <Component {...pageProps} />;
}

export default MyApp;

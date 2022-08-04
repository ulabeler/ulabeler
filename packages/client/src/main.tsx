/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from '@/sample/home/index';
import About from '@/sample/about/index';
import Footer from './components/Footer';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Footer />
    </React.StrictMode>,
);

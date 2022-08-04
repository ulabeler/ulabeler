/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Privacypolicy from '@/pages/fromFooter/privacypolicy/index';
import Sitepolicy from '@pages/fromFooter/sitepolicy/index';
import Faq from '@/pages/fromFooter/faq/index';

import Footer from '@components/Footer/Footer';
import Header from './components/Header/Header';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Header />
      <BrowserRouter>
        <Routes>
          {/* <Route path={`/`} element={<Home />} /> */}
          <Route path={`/privacypolicy`} element={<Privacypolicy />} />
          <Route path={`/sitepolicy`} element={<Sitepolicy />} />
          <Route path={`/faq`} element={<Faq />} />
          {/* 上から順番にマッチしていく */}
          <Route path="*" element={<div>not found</div>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </React.StrictMode>,
);

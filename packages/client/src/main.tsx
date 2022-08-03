import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from '@/sample/home/index';
import About from '@/sample/about/index';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Home />} />
				<Route path={`/about`} element={<About />} />
				{/* 上から順番にマッチしていく */}
				<Route path="*" element={<div>not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

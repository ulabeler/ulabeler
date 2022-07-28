import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App'
import './index.css'
import { BrowserRouter, Route } from "react-router-dom";

const container = document.getElementById("app");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);

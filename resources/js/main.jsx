import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const appContainer = document.getElementById('app');

if (appContainer) {
  createRoot(appContainer).render(<App />);
}
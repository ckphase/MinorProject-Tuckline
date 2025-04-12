import './globals.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NuqsAdapter>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NuqsAdapter>
  </StrictMode>
);

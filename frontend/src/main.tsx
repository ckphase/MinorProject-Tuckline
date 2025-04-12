import './globals.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </NuqsAdapter>
  </StrictMode>
);

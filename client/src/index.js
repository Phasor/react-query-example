import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import App2 from './App2';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));

// <App /> is a bascc react query example
// <App2 /> is more involved

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <App /> */}
      <App2 />
      <ReactQueryDevtools/>
    </QueryClientProvider>
  </React.StrictMode>
);


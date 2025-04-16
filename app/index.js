import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';


const container = document.getElementById('root');
const root = createRoot(container); // Menggunakan createRoot di React v18

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

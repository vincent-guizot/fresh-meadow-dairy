import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routers/routes';
import { AppProvider } from '../context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

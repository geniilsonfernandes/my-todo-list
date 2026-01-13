import React from 'react';
import { AppRoutes } from '../routes/AppRoutes';
import { Providers } from './providers/Providers';



export const App = () => (
  <Providers>
    <AppRoutes />
  </Providers>
);

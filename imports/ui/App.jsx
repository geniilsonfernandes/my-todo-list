import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../style/theme';
import { AppRoutes } from '../routes/AppRoutes';
import { Toaster } from 'sonner'


export const App = () => (
  <ThemeProvider theme={theme}>
    <Toaster position="top-center" richColors />
    <CssBaseline />
    <AppRoutes />
  </ThemeProvider>
);

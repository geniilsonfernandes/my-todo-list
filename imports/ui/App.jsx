import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../style/theme';
import { AppRoutes } from '../routes/AppRoutes';


export const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppRoutes />
  </ThemeProvider>
);

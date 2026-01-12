import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../style/theme';
import { Toaster } from 'sonner'

export const Providers = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <Toaster position="bottom-right" richColors />
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};  
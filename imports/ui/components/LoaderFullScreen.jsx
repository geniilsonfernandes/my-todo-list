import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

export const LoaderFullScreen = ({ message = 'Carregando...' }) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            gap: 2,
        }}
    >
        <CircularProgress size={60} color="primary" />
        <Typography variant="h6" color="text.secondary">
            {message}
        </Typography>
    </Box>
);
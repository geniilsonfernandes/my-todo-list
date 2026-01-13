import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const EmptyState = ({ message = "Nenhuma tarefa encontrada", onAction, actionText = "Adicionar Tarefa" }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '60vh',
                textAlign: 'center',
                gap: 2,
                color: 'text.secondary',
            }}
        >
            <AssignmentIcon sx={{ fontSize: 80, color: 'grey.400' }} />
            <Typography variant="h6">{message}</Typography>
            {onAction && (
                <Button variant="contained" color="primary" onClick={onAction}>
                    {actionText}
                </Button>
            )}
        </Box>
    );
};
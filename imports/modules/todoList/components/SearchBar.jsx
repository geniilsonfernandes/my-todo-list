import React, { useState, useEffect } from 'react';
import { Box, TextField, InputAdornment, FilledInput, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = ({ onSearch, delay = 500 }) => {
    const [value, setValue] = useState('');

    React.useEffect(() => {
        const handler = setTimeout(() => {
            onSearch(value);
        }, delay);

        return () => clearTimeout(handler); // limpa o timeout se o usuário digitar rápido
    }, [value, onSearch, delay]);

    return (
        <Box sx={{ my: 2 }}>
            <OutlinedInput
                fullWidth
                variant="outlined"
                placeholder="Procurar..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                }
            />
        </Box>
    );
};
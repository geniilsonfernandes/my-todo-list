import React from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = () => {
    return (
        <Box sx={{ my: 2 }}>

            <TextField
                fullWidth
                variant="outlined"
                placeholder="Procurar..."
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    },
                }}
            />
        </Box>
    );
};


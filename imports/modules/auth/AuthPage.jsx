import React from 'react';
import { Box, Typography, TextField, Button, InputAdornment, IconButton, FormControl, InputLabel, FormHelperText } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { authSchema } from './validation/authValidation';
import { useAuth } from './hooks/useAuth';

export const AuthPage = () => {
  const { login, register, loading } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { register: formRegister, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: 'genilson@gmail.com',
      password: '123456e',
    },
  });

  const handleLogin = (data) => login(data.email, data.password);
  const handleRegister = (data) => register(data.email, data.password);

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      maxWidth={400}
      mx="auto"
    >
      <Typography variant='h6' gutterBottom>
        Bem-vindo ao Todo list App!
      </Typography>

      <Box component="form" noValidate sx={{ mt: 2 }}>
        <TextField
          size='small'
          label="Email"
          variant="outlined"
          fullWidth
          {...formRegister('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <FormControl size='small' error={!!errors.password} fullWidth sx={{ mt: 2 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            {...formRegister('password')}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText>{errors.password?.message}</FormHelperText>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit(handleLogin)}
          disabled={loading}
          loading={loading}
        >
          Entrar
        </Button>
        <Button
          variant="text"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit(handleRegister)}
          disabled={loading}
        >
          Cadastrar
        </Button>
      </Box>
    </Box>
  );
};
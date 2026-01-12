import React from 'react';
import { Box, Typography, TextField, Button, Link as MuiLink, InputAdornment, IconButton, FormControl, InputLabel, FormHelperText } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.email({ message: 'Email inválido' }),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export const WelcomePage = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
    setShowPassword(true);
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
    setShowPassword(false);
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const handleLogin = (data) => {
    console.log('Login attempt', data);
  };

  const handleRegister = (data) => {
    console.log('Register attempt', data);
  };

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
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <FormControl size='small' error={!!errors.password} fullWidth sx={{ mt: 2, }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            {...register('password')}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
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
        >
          Entrar
        </Button>
        <Button
          variant="text"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit(handleRegister)}
        >
          Cadastrar
        </Button>
      </Box>

      <Box sx={{ mt: 3 }}>
        <MuiLink component={Link} to="/info">
          Recuperar senha
        </MuiLink>
      </Box>
    </Box>
  );
};
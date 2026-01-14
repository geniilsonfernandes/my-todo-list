import React, { useState } from 'react';
import { Box, Typography, TextField, Button, InputAdornment, IconButton, FormControl, InputLabel, FormHelperText, Drawer, Stack } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { authSchema } from './validation/authValidation';

import { useAuth } from '../../ui/context/AuthContext';

const RegisterForm = ({ onClose, emailCreated }) => {
  const { register: createAccount, loading } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    await createAccount(data.email, data.password);
    emailCreated(data.email);
    onClose();
  }

  return (
    <Box sx={{ width: 350, p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Criar Nova Conta
      </Typography>

      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          size='small'
          label="Email"
          variant="outlined"
          fullWidth
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <FormControl size='small' error={!!errors.password} fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password-register">Senha</InputLabel>
          <OutlinedInput
            {...register('password')}
            id="outlined-adornment-password-register"
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
            label="Senha"
          />
          <FormHelperText>{errors.password?.message}</FormHelperText>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          type="submit"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? 'Criando...' : 'Confirmar Cadastro'}
        </Button>

        <Button
          variant="outlined"
          color="inherit"
          fullWidth
          onClick={onClose}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  );
};

export const AuthPage = () => {
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { register, handleSubmit, formState: { errors }, setValue, setFocus } = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = (data) => login(data.email, data.password)

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

      <Box component="form" noValidate sx={{ mt: 2, width: '100%' }}>
        <TextField
          size='small'
          label="Email"
          variant="outlined"
          fullWidth
          autoFocus
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <FormControl size='small' error={!!errors.password} fullWidth sx={{ mt: 2 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            {...register('password')}
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
          onClick={() => setIsDrawerOpen(true)}
          disabled={loading}
        >
          Cadastrar
        </Button>
      </Box>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <RegisterForm onClose={() => setIsDrawerOpen(false)}
          emailCreated={(email) => {
            setValue('email', email, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true
            });
            setFocus('email');
          }}
        />
      </Drawer>
    </Box>
  );
};
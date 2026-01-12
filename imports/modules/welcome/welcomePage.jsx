import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

export const WelcomePage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aqui você chamaria o método do Meteor para login
    console.log('Login attempt', { email, password });
  };

  const handleRegister = () => {
    // Aqui você chamaria Accounts.createUser
    console.log('Register attempt', { email, password });
  };

  return (
    <Container maxWidth="sm">
      <Box
        justifyContent="center"
        alignItems="center"
        display="flex"
        flexDirection="column"
      >
        <Typography variant='h6' gutterBottom>
          Bem-vindo ao Todo list App!
        </Typography>

        <Box component="form" noValidate sx={{ mt: 2 }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Entrar
          </Button>
          <Button
            variant="text"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleRegister}
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
    </Container>
  );
};
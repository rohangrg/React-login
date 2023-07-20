import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid, Snackbar } from '@mui/material';
import AlertMessage from './AlertMessage';
import Urls from './../../constants';

const LoginForm = ({setShowLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmationPasswordChange = (e) => {
    setConfirmationPassword(e.target.value);
  };

  const handleLoginSignup = () => {
    setShowLogin(true)
  }

  const showAlertMessage = (data) => {
    setApiResponse(data);
    setShowAlert(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${Urls.domain}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "user": {
          "email": email,
          "password": password,
          "password_confirmation": confirmationPassword
        }
      }),
    })
    .then(response => {
      // const headers = response.headers;
  
      // headers.forEach((value, name) => {
      //   if (name == 'authorization') {
      //     localStorage.setItem('authorization', value);
      //   }
      // });
  
      return response.json();
    })
    .then(data => {
      if (data.error) {
        showAlertMessage(data);
      } else {
        handleLoginSignup();
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Sign up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Confirmation Password"
          type="password"
          value={confirmationPassword}
          onChange={handleConfirmationPasswordChange}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign up
        </Button>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button onClick={handleLoginSignup}>
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      {
        showAlert && (<AlertMessage setShowAlert={setShowAlert} message={apiResponse.error} severity="error" />)
      }
    </Container>
  );
};

export default LoginForm;

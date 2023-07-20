import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';
import AlertMessage from './AlertMessage';
import Urls from './../../constants';

const LoginForm = ({setShowLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSignup = () => {
    setShowLogin(false)
  }

  const showAlertMessage = (data) => {
    setApiResponse(data);
    setShowAlert(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${Urls.domain}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "user": {
          "email": email,
          "password": password,
        }
      }),
    })
    .then(response => {
      const headers = response.headers;
  
      headers.forEach((value, name) => {
        if (name == 'authorization') {
          localStorage.setItem('authorization', value);
        }
      });
  
      return response.json();
    })
    .then(data => {
      if (data.error) {
        showAlertMessage(data);
      } else {
        localStorage.setItem('userData', JSON.stringify(data?.data?.user || ''));
        location.reload();
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Login
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
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button onClick={handleLoginSignup}>
              Sign Up
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

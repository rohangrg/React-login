import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/login', {
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
      console.log(JSON.stringify(data.status.data.user))
      localStorage.setItem('userData',JSON.stringify(data.status.data.user));
      location.reload();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <Button type="submit">Login</Button>
    </form>
  );
}

export default LoginForm;

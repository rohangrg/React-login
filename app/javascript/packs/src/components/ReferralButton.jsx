import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const ReferralButton = ({setReferrals}) => {
  const [inputValue, setInputValue] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail) {
      return;
    }

    
    console.log('Submitted value:', inputValue);

    fetch('http://localhost:3000/referrals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('authorization'),
      },
      body: JSON.stringify({
        "referral": {
            "email": inputValue
        }
    }),
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log('Received, data:', data.data.user.referrals);
      localStorage.setItem('referrals', data.data.user.referrals);
      setReferrals(data.data.user.referrals);
    })
    .catch(error => {
      console.error('Error:', error);
    });

    setInputValue('');
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setIsValidEmail(validateEmail(e.target.value));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        value={inputValue}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        error={!isValidEmail}
        helperText={!isValidEmail ? 'Invalid email' : ''}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default ReferralButton;

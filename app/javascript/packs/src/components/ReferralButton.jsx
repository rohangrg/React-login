import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import AlertMessage from './AlertMessage';

const ReferralButton = ({setReferrals}) => {
  const [inputValue, setInputValue] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const showAlertMessage = (data) => {
    setApiResponse(data);
    setShowAlert(true);
  };

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
      if(data.error) {
        showAlertMessage(data);
      } else {
        localStorage.setItem('userData', JSON.stringify(data?.data?.user || ''));
        setReferrals(data.data.user.referrals);
      }
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
    <form onSubmit={handleSubmit} style={{display: 'flex'}}>
      <TextField
        label="Enter an email address for referral"
        value={inputValue}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        error={!isValidEmail}
        helperText={!isValidEmail ? 'Invalid email' : ''}
        style={{marginRight: '12px'}}
        type="email"
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>

      {
        showAlert && (<AlertMessage setShowAlert={setShowAlert} message={apiResponse.error} severity="error" />)
      }
    </form>
  );
};

export default ReferralButton;

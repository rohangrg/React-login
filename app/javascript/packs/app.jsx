import React, { useState } from 'react';
import LoginForm from './src/components/LoginForm';
import SignupForm from './src/components/SignupForm';
import ReferralTable from './src/components/ReferralTable';
import ReferralButton from './src/components/ReferralButton';
import { Button } from '@mui/material';
import Urls from './constants';

function handleLogoutButton(setLogoutUser) {
  fetch(`${Urls.domain}/logout`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('authorization'),
      }
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      if(data.error) {
        showAlertMessage(data);
      } else {
        localStorage.clear();
        setLogoutUser(true);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });

    localStorage.clear();
    setLogoutUser(true);
}

function App() {
  const [referrals, setReferrals] = useState([]);
  const [logoutUser, setLogoutUser] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  if (!!window.localStorage.getItem('authorization') && !logoutUser){
    return (
      <div>
        <div style={{display: 'flex', 'justifyContent': 'space-between', padding: '0px 12px'}}>
          <h1>My Referrals</h1>
          <Button onClick={()=> handleLogoutButton(setLogoutUser)}>Logout</Button>
        </div>
        <ReferralButton setReferrals={setReferrals} />
        <ReferralTable referrals={referrals}/>
      </div>
    );
  } else {
    if (showLogin) {
      return (
        <div>
          <br></br>
          <br></br>
          <LoginForm setShowLogin={setShowLogin}/>
        </div>
      )
    } else {
      return (
        <div>
          <br></br>
          <br></br>
          <SignupForm setShowLogin={setShowLogin} />
        </div>
      );
    }
  }
}

export default App;

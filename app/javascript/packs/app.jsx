import React, { useState } from 'react';
import LoginForm from './src/components/LoginForm';
import ReferralTable from './src/components/ReferralTable';
import ReferralButton from './src/components/ReferralButton';
import { Button } from '@mui/material';

function handleLogoutButton(setLogoutUser) {
  localStorage.clear();
  setLogoutUser(true);
}

function App() {
  const [referrals, setReferrals] = useState([]);
  const [logoutUser, setLogoutUser] = useState(false);
  if (!!window.localStorage.getItem('authorization') && !logoutUser){
    return (
      <div>
        <div style={{display: 'flex', 'justifyContent': 'space-between', padding: '8px'}}>
          <h1>My Referrals</h1>
          <Button onClick={()=> handleLogoutButton(setLogoutUser)}>Logout</Button>
        </div>
        <ReferralButton setReferrals={setReferrals} />
        <ReferralTable referrals={referrals}/>
      </div>
    );
  } else {
    return (
      <div>
        <h1>My App</h1>
        <LoginForm />
      </div>
    );
  }
}

export default App;

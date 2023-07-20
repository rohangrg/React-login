import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ReferralTable = ({updatedReferrals=[]}) => {
  const referrals = ((!!localStorage.getItem('userData') && updatedReferrals.length != 0) ? updatedReferrals : JSON.parse(localStorage.getItem('userData'))?.referrals) || [];
  console.log(localStorage.getItem('userData'));
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S.No.</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {referrals.map((referral, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{referral.email}</TableCell>
              <TableCell>{referral.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReferralTable;

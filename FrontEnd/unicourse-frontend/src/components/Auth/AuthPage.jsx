// src/components/Auth/AuthPage.jsx
import React, { useState } from 'react';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import CenteredPaper from '../Layout/CenteredPaper';

const AuthPage = () => {
  const [tab, setTab] = useState(0);

  return (
    <CenteredPaper width={430}>
      <Box sx={{ mb: 2, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={700} letterSpacing={2} color="primary">
          UniCourse Management
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 0.5 }}>
          Student Portal
        </Typography>
      </Box>
      <Tabs
        value={tab}
        onChange={(_, newTab) => setTab(newTab)}
        variant="fullWidth"
        sx={{ mb: 3 }}
      >
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>
      {tab === 0 ? <LoginForm /> : <RegisterForm />}
    </CenteredPaper>
  );
};

export default AuthPage;

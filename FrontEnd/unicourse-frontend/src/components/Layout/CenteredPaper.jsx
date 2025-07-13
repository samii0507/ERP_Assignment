// src/components/Layout/CenteredPaper.jsx
import React from 'react';
import { Box, Paper } from '@mui/material';

const CenteredPaper = ({ children, width = 400 }) => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(120deg, #f1f1f1 0%, #cfd9df 100%)',
    }}
  >
    <Paper elevation={6} sx={{ p: 4, width, borderRadius: 4 }}>
      {children}
    </Paper>
  </Box>
);

export default CenteredPaper;

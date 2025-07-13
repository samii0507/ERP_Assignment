// src/components/Auth/LoginForm.jsx
import React, { useState } from 'react';
import { TextField, Button, Typography, CircularProgress, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from "../utils/api";

const LoginForm = () => {
  const [fields, setFields] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e =>
    setFields({ ...fields, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/students/login', fields);
      // Expecting: { token, student: { id, email, name, ... } }
      if (res.token && res.student && res.student.id) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('studentId', res.student.id); // Store studentId for later
        navigate('/courses');
      } else if (res.token) {
        // Fallback if backend only returns token
        localStorage.setItem('token', res.token);
        // Optionally: fetch current student and save id here if backend supports /students/me
        setError('Logged in, but studentId not found. Some features may not work.');
        navigate('/courses');
      } else {
        setError('Invalid credentials.');
      }
    } catch (err) {
      setError(
        err?.message ||
        err?.error ||
        'Login failed. Check your credentials.'
      );
    }
    setLoading(false);
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 4,
        maxWidth: 400,
        mx: 'auto',
        mt: 6,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
        Student Login
      </Typography>
      <form onSubmit={handleSubmit} autoComplete="off">
        <TextField
          label="Email"
          name="email"
          value={fields.email}
          onChange={handleChange}
          type="email"
          fullWidth
          required
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Password"
          name="password"
          value={fields.password}
          onChange={handleChange}
          type="password"
          fullWidth
          required
          margin="normal"
          variant="outlined"
        />
        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="success"
          fullWidth
          sx={{ mt: 2, py: 1, fontWeight: 'bold', letterSpacing: 1 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'LOGIN'}
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;

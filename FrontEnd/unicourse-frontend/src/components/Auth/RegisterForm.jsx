// src/components/Auth/RegisterForm.jsx
import React, { useState } from 'react';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';
import api from "../utils/api";


const RegisterForm = () => {
  const [fields, setFields] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = e =>
    setFields({ ...fields, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const res = await api.post('/students/register', fields);
      setMessage('Registration successful! You can now login.');
      setFields({ name: '', email: '', password: '' });
    } catch (err) {
      setMessage('Registration failed: ' + (err?.error || 'Unknown error'));
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <TextField
        label="Name"
        name="name"
        value={fields.name}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        variant="outlined"
      />
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
      {message && (
        <Typography
          sx={{ mt: 1 }}
          color={message.startsWith('Registration successful') ? 'primary' : 'error'}
        >
          {message}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        fullWidth
        sx={{ mt: 2, py: 1 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Register'}
      </Button>
    </form>
  );
};

export default RegisterForm;

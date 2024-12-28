import React, { useState } from 'react';
import { TextField, Button, Box, IconButton, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

const styles = {
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      backgroundColor: '#f8fafc',
      '&:hover': {
        backgroundColor: '#f1f5f9',
      },
      '&.Mui-focused': {
        backgroundColor: '#fff',
      },
    },
  },
  submitButton: {
    marginTop: 2,
    padding: '0.75rem 0',
    borderRadius: 2,
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    background: 'linear-gradient(45deg, #2563eb, #3b82f6)',
    '&:hover': {
      background: 'linear-gradient(45deg, #1d4ed8, #2563eb)',
    },
  },
  icon: {
    marginRight: 1,
    color: '#3b82f6'
  }
};

const LoginForm = ({ showPassword, togglePasswordVisibility }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:5000/user/login', formData);
      if (response.data.token) {
        setMessage('Login successful!');
        setIsSuccess(true);
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box 
      component="form" 
      noValidate 
      autoComplete="off" 
      onSubmit={handleSubmit} 
      sx={{ marginTop: "5vh" }}
    >
      <TextField
        fullWidth
        size="small"
        label="Email"
        variant="outlined"
        margin="dense"
        sx={styles.textField}
        name="email"
        value={formData.email}
        onChange={handleChange}
        InputProps={{
          startAdornment: <EmailIcon sx={styles.icon} />,
        }}
        disabled={isSubmitting}
      />
      
      <TextField
        fullWidth
        size="small"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        margin="dense"
        sx={styles.textField}
        name="password"
        value={formData.password}
        onChange={handleChange}
        InputProps={{
          startAdornment: <LockIcon sx={styles.icon} />,
          endAdornment: (
            <IconButton 
              onClick={togglePasswordVisibility} 
              edge="end" 
              size="small"
              disabled={isSubmitting}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          ),
        }}
        disabled={isSubmitting}
      />
      
      <Button
        fullWidth
        type="submit"
        variant="contained"
        sx={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Logging in...' : 'Login'}
      </Button>

      {message && (
        <Typography 
          variant="body2"
          sx={{
            marginTop: 2,
            textAlign: 'center',
            color: isSuccess ? '#22c55e' : '#ff0000'
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoginForm;
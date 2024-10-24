import React, { useState } from 'react';
import { TextField, Button, Box, IconButton, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import Cookies from 'js-cookie';

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
    mt: 2,
    py: 1.5,
    borderRadius: 2,
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    background: 'linear-gradient(45deg, #2563eb, #3b82f6)',
    '&:hover': {
      background: 'linear-gradient(45deg, #1d4ed8, #2563eb)',
    },
  },
};

const LoginForm = ({ showPassword, togglePasswordVisibility }) => {
  const [formData, setFormData] = useState({
    Company_email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Check if user is already logged in
  React.useEffect(() => {
    const token = Cookies.get('jwt_token');
    if (token) {
      // Redirect to dashboard or verify token validity
      // window.location.href = '/dashboard';  // Uncomment this line to enable redirect
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/company/login', formData);
      
      if (response.data.token) {
        // Store the JWT token in cookies (expires in 7 days)
        Cookies.set('jwt_token', response.data.token, { expires: 7 });
        
        // Set success message
        setMessage('Login successful!');
        setIsSuccess(true);

        // Clear form
        setFormData({
          Company_email: '',
          password: ''
        });

        // Redirect to dashboard (uncomment and modify as needed)
        // window.location.href = '/dashboard';
      }
    } catch (error) {
      setIsSuccess(false);
      if (error.response) {
        console.error("Error data:", error.response.data);
        setMessage(error.response.data.message || 'Login failed. Please check your credentials.');
      } else {
        console.error("Error message:", error.message);
        setMessage('Login failed. Please try again.');
      }
    }
  };

  // Function to check if token is valid
  const verifyToken = async () => {
    const token = Cookies.get('jwt_token');
    if (token) {
      try {
        // Add this endpoint to your backend
        const response = await axios.get('http://localhost:5000/company/verify-token', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return response.data.valid;
      } catch (error) {
        Cookies.remove('jwt_token');
        return false;
      }
    }
    return false;
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        size="small"
        label="Email"
        variant="outlined"
        margin="dense"
        sx={styles.textField}
        name="Company_email"
        value={formData.Company_email}
        onChange={handleChange}
        InputProps={{
          startAdornment: <EmailIcon sx={{ mr: 1, color: '#3b82f6' }} />,
        }}
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
          startAdornment: <LockIcon sx={{ mr: 1, color: '#3b82f6' }} />,
          endAdornment: (
            <IconButton onClick={togglePasswordVisibility} edge="end" size="small">
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          ),
        }}
      />
      <Button
        fullWidth
        type="submit"
        variant="contained"
        sx={styles.submitButton}
      >
        Login
      </Button>

      {message && (
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', color: isSuccess ? '#22c55e' : '#ff0000' }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoginForm;
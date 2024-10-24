import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import GroupIcon from '@mui/icons-material/Group';
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

const SignUpForm = ({ showPassword, togglePasswordVisibility }) => {
  const initialFormState = {
    name: '',
    company_name: '',
    Company_email: '',
    phoneNumber: '',
    employee_size: '',
    password: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      employee_size: parseInt(formData.employee_size),
    };

    try {
      const response = await axios.post('http://localhost:5000/company/register', dataToSend);
      setMessage('Registration successful!');
      setIsSuccess(true);
      setFormData(initialFormState); // Clear the form
      console.log(response.data);
    } catch (error) {
      setIsSuccess(false);
      if (error.response) {
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        setMessage(`Registration failed: ${error.response.data.message || 'Please try again.'}`);
      } else {
        console.error("Error message:", error.message);
        setMessage('Registration failed. Please try again.');
      }
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        size="small"
        label="Name"
        variant="outlined"
        margin="dense"
        sx={styles.textField}
        name="name"
        value={formData.name}
        onChange={handleChange}
        InputProps={{
          startAdornment: <PersonIcon sx={{ mr: 1, color: '#3b82f6' }} />,
        }}
      />
      <TextField
        fullWidth
        size="small"
        label="Phone no."
        variant="outlined"
        margin="dense"
        sx={styles.textField}
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        InputProps={{
          startAdornment: <PhoneIcon sx={{ mr: 1, color: '#3b82f6' }} />,
        }}
      />
      <TextField
        fullWidth
        size="small"
        label="Company Name"
        variant="outlined"
        margin="dense"
        sx={styles.textField}
        name="company_name"
        value={formData.company_name}
        onChange={handleChange}
        InputProps={{
          startAdornment: <BusinessIcon sx={{ mr: 1, color: '#3b82f6' }} />,
        }}
      />
      <TextField
        fullWidth
        size="small"
        label="Company Email"
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
        label="Employee Size"
        variant="outlined"
        margin="dense"
        sx={styles.textField}
        name="employee_size"
        value={formData.employee_size}
        onChange={handleChange}
        InputProps={{
          startAdornment: <GroupIcon sx={{ mr: 1, color: '#3b82f6' }} />,
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
        Sign Up
      </Button>

      {message && (
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', color: isSuccess ? '#22c55e' : '#ff0000' }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default SignUpForm;
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Person as PersonIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  Email as EmailIcon,
  Group as GroupIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import axios from 'axios';
// import { AuthProvider } from '../context/AuthContext';

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

const SignUpForm = ({ showPassword, togglePasswordVisibility }) => {
  const navigate = useNavigate();
  // const { login } = AuthProvider();
  
  const initialFormState = {
    name: '',
    company_name: '',
    Company_email: '',
    phoneNumber: '',
    employee_size: '',
    password: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.company_name.trim()) {
      newErrors.company_name = 'Company name is required';
    }
    
    if (!formData.Company_email.trim()) {
      newErrors.Company_email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.Company_email)) {
      newErrors.Company_email = 'Please enter a valid email';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.employee_size.trim()) {
      newErrors.employee_size = 'Employee size is required';
    } else if (isNaN(formData.employee_size) || parseInt(formData.employee_size) < 1) {
      newErrors.employee_size = 'Please enter a valid number';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/company/register', {
        ...formData,
        employee_size: parseInt(formData.employee_size),
      });

      setMessage('Registration successful! Redirecting to login...');
      setIsSuccess(true);
      setFormData(initialFormState);
      
      // Optional: Auto-login after successful registration
      if (response.data.token) {
        // await login(response.data.token);
      } else {
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (error) {
      setIsSuccess(false);
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else if (error.response?.status === 409) {
        setMessage('This email is already registered. Please try logging in.');
      } else {
        setMessage('Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    { name: 'name', label: 'Name', Icon: PersonIcon },
    { name: 'phoneNumber', label: 'Phone no.', Icon: PhoneIcon },
    { name: 'company_name', label: 'Company Name', Icon: BusinessIcon },
    { name: 'Company_email', label: 'Company Email', Icon: EmailIcon },
    { name: 'employee_size', label: 'Employee Size', Icon: GroupIcon },
  ];

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      {formFields.map(({ name, label, Icon }) => (
        <TextField
          key={name}
          fullWidth
          size="small"
          label={label}
          variant="outlined"
          margin="dense"
          sx={styles.textField}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          error={Boolean(errors[name])}
          helperText={errors[name]}
          InputProps={{
            startAdornment: <Icon sx={styles.icon} />,
          }}
          disabled={isSubmitting}
        />
      ))}
      
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
        error={Boolean(errors.password)}
        helperText={errors.password}
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
        {isSubmitting ? 'Signing Up...' : 'Sign Up'}
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

export default SignUpForm;
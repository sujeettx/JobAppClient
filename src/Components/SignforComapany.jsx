import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton } from '@mui/material';
import { changeFormType } from './AuthPage';
import {
  Email as EmailIcon,
  Business as BusinessIcon,
  Language as WebsiteIcon,
  Lock as LockIcon,
  Factory as IndustryIcon,
  LocationOn as LocationIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
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

const SignUpForm = ({ showPassword, togglePasswordVisibility }) => {

  const initialFormState = {
    email: '',
    password: '',
    role: 'company',
    profile: {
      companyName: '',
      industry: '',
      location: '',
      website: ''
    }
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (!formData.profile.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.profile.industry.trim()) {
      newErrors.industry = 'Industry is required';
    }

    if (!formData.profile.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.profile.website.trim()) {
      newErrors.website = 'Website is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in initialFormState) {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({
        ...prev,
        profile: { ...prev.profile, [name]: value }
      }));
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTimeout(changeFormType('login'),1000);
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setMessage('');

    try {
      await axios.post('http://localhost:8080/users/register', formData);
      setMessage('Registration successful! Redirecting to login...');
      setIsSuccess(true);
      setFormData(initialFormState);
    } catch (error) {
      setIsSuccess(false);
      setMessage(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    { name: 'email', label: 'Company Email', Icon: EmailIcon },
    { name: 'companyName', label: 'Company Name', Icon: BusinessIcon },
    { name: 'industry', label: 'Industry', Icon: IndustryIcon },
    { name: 'location', label: 'Location', Icon: LocationIcon },
    { name: 'website', label: 'Website', Icon: WebsiteIcon },
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
          value={name === 'email' ? formData.email : formData.profile[name]}
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
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton, Chip, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Email as EmailIcon,
  Person as PersonIcon,
  Description as ResumeIcon,
  Code as SkillsIcon,
  Web as PortfolioIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Add as AddIcon
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
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    marginTop: 1
  }
};

const SignUpForm = ({ showPassword, togglePasswordVisibility }) => {
  const navigate = useNavigate();

  const initialFormState = {
    email: '',
    password: '',
    role: 'student',
    profile: {
      fullName: '',
      resumeLink: '',
      skills: [],
      portfolio: ''
    }
  };

  const [formData, setFormData] = useState(initialFormState);
  const [newSkill, setNewSkill] = useState('');
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

    if (!formData.profile.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.profile.resumeLink.trim()) {
      newErrors.resumeLink = 'Resume link is required';
    }

    if (!formData.profile.portfolio.trim()) {
      newErrors.portfolio = 'Portfolio link is required';
    }

    if (formData.profile.skills.length === 0) {
      newErrors.skills = 'At least one skill is required';
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

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          skills: [...prev.profile.skills, newSkill.trim()]
        }
      }));
      setNewSkill('');
      if (errors.skills) {
        setErrors(prev => ({ ...prev, skills: '' }));
      }
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        skills: prev.profile.skills.filter(skill => skill !== skillToRemove)
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setMessage('');

    try {
      await axios.post('http://localhost:5000/user/register', formData);
      setMessage('Registration successful! Redirecting to login...');
      setIsSuccess(true);
      setFormData(initialFormState);
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      setIsSuccess(false);
      setMessage(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    { name: 'email', label: 'Email', Icon: EmailIcon },
    { name: 'fullName', label: 'Full Name', Icon: PersonIcon },
    { name: 'resumeLink', label: 'Resume Link', Icon: ResumeIcon },
    { name: 'portfolio', label: 'Portfolio Link', Icon: PortfolioIcon },
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

      <Box sx={{ mt: 2 }}>
        <TextField
          fullWidth
          size="small"
          label="Add Skills"
          variant="outlined"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          error={Boolean(errors.skills)}
          helperText={errors.skills}
          InputProps={{
            startAdornment: <SkillsIcon sx={styles.icon} />,
            endAdornment: (
              <IconButton 
                onClick={handleAddSkill}
                edge="end"
                disabled={!newSkill.trim()}
              >
                <AddIcon />
              </IconButton>
            ),
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddSkill();
            }
          }}
        />
        <Stack direction="row" sx={styles.chipContainer}>
          {formData.profile.skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              onDelete={() => handleRemoveSkill(skill)}
              color="primary"
              variant="outlined"
            />
          ))}
        </Stack>
      </Box>
      
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
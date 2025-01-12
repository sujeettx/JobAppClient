import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton, Chip, Stack, Grid } from '@mui/material';
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
  formContainer: {
    width: '100%',
    maxWidth: '450px',
    padding: { xs: 3, md: 4 },
    borderRadius: 4,
    backgroundColor: '#fff',
    border: '1px solid rgba(0, 0, 0, 0.06)',
  },
  marketingTitle: {
    fontWeight: 700,
    color: '#1e3a8a',
    marginBottom: 3,
    fontSize: { xs: '2rem', md: '2.5rem' },
  },
  marketingSubtitle: {
    color: '#64748b',
    marginBottom: 4,
    maxWidth: '500px',
    lineHeight: 1.6,
  },
  formTitle: {
    fontWeight: 700,
    marginBottom: 0.5,
    textAlign: 'center',
    color: '#2563eb',
  },
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
  navButton: {
    marginTop: 2,
    color: '#2563eb',
    textTransform: 'none',
    fontSize: '0.875rem',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: 'rgba(37, 99, 235, 0.04)',
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

const StudentSignup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setMessage('');

    try {
      await axios.post('https://job-box-server-fn4k.onrender.com/users/register', formData);
      setMessage('Registration successful! Redirecting to login...');
      setIsSuccess(true);
      setFormData(initialFormState);
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setIsSuccess(false);
      setMessage(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ minHeight: '30vh', display: 'flex' }}>
      <Grid container sx={{ m: 0 }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: { xs: 2, md: 6 },
            textAlign: 'center',
          }}
        >
          <Typography variant="h2" sx={styles.marketingTitle}>
            Find Your Next<br />Great Opportunity
          </Typography>
          <Typography variant="h6" sx={styles.marketingSubtitle}>
            Connect with top companies and build your career. Apply to jobs,
            track applications, and find your dream role all in one place.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            p: { xs: 2, md: 6 },
          }}
        >
          <Box sx={styles.formContainer}>
            <Typography variant="h4" sx={styles.formTitle}>
              Get Started
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', textAlign: 'center', mb: 3 }}
            >
              Create your account and start applying
            </Typography>

            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
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
                error={Boolean(errors.email)}
                helperText={errors.email}
                InputProps={{
                  startAdornment: <EmailIcon sx={styles.icon} />,
                }}
                disabled={isSubmitting}
              />

              <TextField
                fullWidth
                size="small"
                label="Full Name"
                variant="outlined"
                margin="dense"
                sx={styles.textField}
                name="fullName"
                value={formData.profile.fullName}
                onChange={handleChange}
                error={Boolean(errors.fullName)}
                helperText={errors.fullName}
                InputProps={{
                  startAdornment: <PersonIcon sx={styles.icon} />,
                }}
                disabled={isSubmitting}
              />

              <TextField
                fullWidth
                size="small"
                label="Resume Link"
                variant="outlined"
                margin="dense"
                sx={styles.textField}
                name="resumeLink"
                value={formData.profile.resumeLink}
                onChange={handleChange}
                error={Boolean(errors.resumeLink)}
                helperText={errors.resumeLink}
                InputProps={{
                  startAdornment: <ResumeIcon sx={styles.icon} />,
                }}
                disabled={isSubmitting}
              />

              <TextField
                fullWidth
                size="small"
                label="Portfolio Link"
                variant="outlined"
                margin="dense"
                sx={styles.textField}
                name="portfolio"
                value={formData.profile.portfolio}
                onChange={handleChange}
                error={Boolean(errors.portfolio)}
                helperText={errors.portfolio}
                InputProps={{
                  startAdornment: <PortfolioIcon sx={styles.icon} />,
                }}
                disabled={isSubmitting}
              />

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
                      onClick={() => setShowPassword(!showPassword)} 
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

              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  fullWidth
                  onClick={() => navigate('/login')}
                  sx={styles.navButton}
                >
                  Already have an account? Login
                </Button>
                
                <Button
                  fullWidth
                  onClick={() => navigate('/signup-company')}
                  sx={styles.navButton}
                >
                  Sign Up as a Company
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentSignup;
import React, { useState } from 'react';
import { Button, Box, Typography, Grid, TextField, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'

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
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://https://job-box-server-fn4k.onrender.com/users/login', {
        email: formData.email,
        password: formData.password
      });
      
      // console.log('Login successful:', response.data);
      toast.success('Login successful!');
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userRole', response.data.role);
      localStorage.setItem('userId', response.data.userId);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <>
      <ToastContainer position="top-right" />
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
                Welcome Back
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', textAlign: 'center', mb: 3 }}
              >
                Login to access your account
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  name="email"
                  type="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
        
                  sx={styles.textField}
                  margin="normal"
                  disabled={isLoading}
                />
                
                <TextField
                  fullWidth
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  value={formData.password}
                  onChange={handleChange}
                  sx={styles.textField}
                  margin="normal"
                  disabled={isLoading}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                          disabled={isLoading}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={styles.submitButton}
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                </Button>
              </form>

              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  fullWidth
                  sx={styles.navButton}
                  onClick={() => navigate('/signup-student')}
                >
                  Don't have an account? Sign Up
                </Button>
                
                <Button
                  fullWidth
                  sx={styles.navButton}
                  onClick={() => navigate('/signup-company')}
                >
                  Sign Up as a Company
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LoginPage;
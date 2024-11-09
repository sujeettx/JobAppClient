import React, { useState } from 'react';
import { Button, Box, Typography, Grid } from '@mui/material';
import LoginForm from './Login';
import SignUpForm from './SignUpPage';

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
  toggleButton: {
    marginTop: 2,
    color: '#2563eb',
    textTransform: 'none',
    fontSize: '0.875rem',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: 'rgba(37, 99, 235, 0.04)',
    },
  }
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleForm = () => setIsLogin(!isLogin);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

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
            Find Your Next<br />Great Hire
          </Typography>
          <Typography variant="h6" sx={styles.marketingSubtitle}>
            Connect with top talent and build your dream team. Post jobs, review applications, 
            and hire the best candidates all in one place.
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
              {isLogin ? 'Welcome Back' : 'Get Started'}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', textAlign: 'center', mb: 3 }}
            >
              {isLogin ? 'Login to access your account' : 'Create your account and start hiring'}
            </Typography>

            {isLogin ? (
              <LoginForm
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
              />
            ) : (
              <SignUpForm
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
              />
            )}

            <Button
              fullWidth
              onClick={toggleForm}
              sx={styles.toggleButton}
            >
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthPage;
import React, { useState } from 'react';
import { Button, Box, Typography, Grid } from '@mui/material';
import LoginForm from './Login';
import SignUpForm from './SignUpPage';

const styles = {
  formContainer: {
    width: '100%',
    maxWidth: '450px',
    p: { xs: 3, md: 4 },
    borderRadius: 4,
    bgcolor: '#fff',
    border: '1px solid rgba(0, 0, 0, 0.06)',
  },
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleForm = () => setIsLogin(!isLogin);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Box sx={{ minHeight: '30vh', display: 'flex' }}>
      <Grid container sx={{ m: 0 }}>
        {/* Left Side: Content */}
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
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: '#1e3a8a',
              mb: 3,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Find Your Next
            <br />
            Great Hire
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#64748b',
              mb: 4,
              maxWidth: '500px',
              lineHeight: 1.6,
            }}
          >
            Connect with top talent and build your dream team. Post jobs, review applications, and hire the best candidates all in one place.
          </Typography>
        </Grid>

        {/* Right Side: Form */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#fff',
            p: { xs: 2, md: 6 },
          }}
        >
          <Box sx={styles.formContainer}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 0.5,
                textAlign: 'center',
                color: '#2563eb',
              }}
            >
              {isLogin ? 'Welcome Back' : 'Get Started'}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', textAlign: 'center', mb: 3 }}
            >
              {isLogin
                ? 'Login to access your account'
                : 'Create your account and start hiring'}
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
              sx={{
                mt: 2,
                color: '#2563eb',
                textTransform: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(37, 99, 235, 0.04)',
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : 'Already have an account? Login'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthPage;
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Grid, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import GroupIcon from '@mui/icons-material/Group';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleForm = () => setIsLogin(!isLogin);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const LoginForm = () => (
    <Box component="form" noValidate autoComplete="off">
      <TextField
        fullWidth
        size="small"
        label="Email"
        variant="outlined"
        margin="dense"
        InputProps={{
          startAdornment: <EmailIcon color="primary" sx={{ mr: 1 }} />,
        }}
      />
      <TextField
        fullWidth
        size="small"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        margin="dense"
        InputProps={{
          startAdornment: <LockIcon color="primary" sx={{ mr: 1 }} />,
          endAdornment: (
            <IconButton onClick={togglePasswordVisibility} edge="end" size="small">
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          ),
        }}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{
          mt: 2,
          py: 1,
          borderRadius: 2,
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#115293',
          },
        }}
      >
        Login
      </Button>
    </Box>
  );

  const SignUpForm = () => (
    <Box component="form" noValidate autoComplete="off">
      <TextField
        fullWidth
        size="small"
        label="Name"
        variant="outlined"
        margin="dense"
        InputProps={{
          startAdornment: <PersonIcon color="primary" sx={{ mr: 1 }} />,
        }}
      />
      <TextField
        fullWidth
        size="small"
        label="Phone no."
        variant="outlined"
        margin="dense"
        InputProps={{
          startAdornment: <PhoneIcon color="primary" sx={{ mr: 1 }} />,
        }}
      />
      <TextField
        fullWidth
        size="small"
        label="Company Name"
        variant="outlined"
        margin="dense"
        InputProps={{
          startAdornment: <BusinessIcon color="primary" sx={{ mr: 1 }} />,
        }}
      />
      <TextField
        fullWidth
        size="small"
        label="Company Email"
        variant="outlined"
        margin="dense"
        InputProps={{
          startAdornment: <EmailIcon color="primary" sx={{ mr: 1 }} />,
        }}
      />
      <TextField
        fullWidth
        size="small"
        label="Employee Size"
        variant="outlined"
        margin="dense"
        InputProps={{
          startAdornment: <GroupIcon color="primary" sx={{ mr: 1 }} />,
        }}
      />
      <TextField
        fullWidth
        size="small"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        margin="dense"
        InputProps={{
          startAdornment: <LockIcon color="primary" sx={{ mr: 1 }} />,
          endAdornment: (
            <IconButton onClick={togglePasswordVisibility} edge="end" size="small">
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          ),
        }}
      />

      <Typography
        variant="caption"
        sx={{ mt: 1, color: 'text.secondary', textAlign: 'center', display: 'block' }}
      >
        By clicking on proceed, you accept our{' '}
        <a href="#" style={{ color: '#1976d2', textDecoration: 'none' }}>
          Terms & Conditions
        </a>
      </Typography>

      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{
          mt: 1,
          py: 1,
          borderRadius: 2,
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#115293',
          },
        }}
      >
        Sign Up
      </Button>
    </Box>
  );

  return (
    <Box
      sx={{
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f5f5f5',
        overflow: 'hidden',
      }}
    >
      <Grid container sx={{ height: '100vh', maxWidth: '1500px', mx: 'auto' }}>
        {/* Left Side: Image */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngplay.com%2Fwp-content%2Fuploads%2F9%2FJob-Transparent-Image.png&f=1&nofb=1&ipt=9f160fd21cea17e5da4881a9b6b7ca3022e6d8eea2b86ff52ecb3e728a7b3d4c&ipo=images"
            alt="Job"
            sx={{
              // width: '80%',
              maxWidth: '600px',
              borderRadius: 3,
              // transition: 'transform 0.3s ease-in-out',
              // '&:hover': {
              //   transform: 'scale(1.02)',
              // },
            }}
          />
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
            p: { xs: 2, md: 4 },
          }}
        >
          <Container
            maxWidth="xs"
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: 4,
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              bgcolor: '#fff',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
              },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                mb: 0.5,
                textAlign: 'center',
                background: 'linear-gradient(45deg, #1976d2, #64b5f6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {isLogin ? 'Welcome Back' : 'Sign Up'}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', textAlign: 'center', mb: 2, display: 'block' }}
            >
              {isLogin
                ? 'Login to access your account'
                : 'Register now and post job opportunities'}
            </Typography>

            {isLogin ? <LoginForm /> : <SignUpForm />}

            <Button
              fullWidth
              variant="text"
              onClick={toggleForm}
              sx={{
                mt: 1,
                color: '#1976d2',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.04)',
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : 'Already have an account? Login'}
            </Button>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthPage;
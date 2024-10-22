// src/components/Header.jsx
import React from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Stack,
  Button,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styles } from './MyStyle';
// import JobPostingLogo from '../Assets/logo.svg';

const Header = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <AppBar position="sticky" elevation={0} sx={styles.appBar}>
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between', padding: '0.5rem 0' }}>
          {/* Left side - Logo */}
          <Box sx={styles.logo} display="flex" alignItems="center">
            <Link href="/" underline="none">
              {/* <img src={JobPostingLogo} alt="Job Posting" /> */}
              <h1>Job Posting</h1>
            </Link>
          </Box>

          {/* Center - Navigation Links */}
          <Stack direction="row" spacing={4} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link href="/find-jobs" underline="none" sx={styles.navLink}>
              Find Jobs
            </Link>
            <Link href="/post-job" underline="none" sx={styles.navLink}>
              Post a Job
            </Link>
            <Link href="/employers" underline="none" sx={styles.navLink}>
              For Employers
            </Link>
            <Link href="/pricing" underline="none" sx={styles.navLink}>
              Pricing
            </Link>
          </Stack>

          {/* Right side - Auth Buttons */}
          <Stack direction="row" spacing={2}>
            <Button 
              color="primary" 
              onClick={handleLogin}
              sx={styles.loginButton}
            >
              Log in
            </Button>
            <Button 
              color="primary" 
              variant="contained" 
              onClick={handleSignUp}
              sx={styles.signUpButton}
            >
              Sign Up
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
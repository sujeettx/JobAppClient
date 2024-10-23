import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Stack,
  Button,
  Link,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const styles = {
  appBar: {
    backgroundColor: 'white',
    borderBottom: '1px solid #eaeaea',
  },
  logo: {
    '& h1': {
      color: '#2563eb',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      margin: 0,
    },
  },
  navLink: {
    color: '#4b5563',
    fontWeight: 500,
    fontSize: '0.975rem',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: '#2563eb',
    },
  },
  loginButton: {
    textTransform: 'none',
    fontWeight: 500,
  },
  signUpButton: {
    textTransform: 'none',
    fontWeight: 500,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
  },
};

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const navigationLinks = [
    { text: 'Find Jobs', href: '/find-jobs' },
    { text: 'Post a Job', href: '/post-job' },
  ];

  const mobileDrawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {navigationLinks.map((item) => (
          <ListItem key={item.text} button component={Link} href={item.href}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem>
          <Button 
            color="primary" 
            fullWidth 
            onClick={handleLogin}
            sx={styles.loginButton}
          >
            Log in
          </Button>
        </ListItem>
        <ListItem>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={handleSignUp}
            sx={styles.signUpButton}
          >
            Sign Up
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" elevation={0} sx={styles.appBar}>
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between', padding: '0.5rem 0' }}>
          {/* Left side - Logo */}
          <Box sx={styles.logo} display="flex" alignItems="center">
            <Link href="/" underline="none">
              <h1>Job Posting</h1>
            </Link>
          </Box>

          {/* Center - Navigation Links (Desktop) */}
          {!isMobile && (
            <Stack direction="row" spacing={4}>
              {navigationLinks.map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  underline="none"
                  sx={styles.navLink}
                >
                  {link.text}
                </Link>
              ))}
            </Stack>
          )}

          {/* Right side - Auth Buttons (Desktop) */}
          {!isMobile && (
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
          )}

          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
      >
        {mobileDrawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;
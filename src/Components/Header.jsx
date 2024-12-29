import React, { useState, useEffect } from 'react';
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
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BusinessIcon from '@mui/icons-material/Business';

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
  navButton: {
    textTransform: 'none',
    fontWeight: 500,
    color: '#4b5563',
    padding: '6px 16px',
    '&:hover': {
      backgroundColor: '#f8fafc',
      color: '#2563eb',
    },
  },
  activeNavButton: {
    backgroundColor: '#eff6ff',
    color: '#2563eb',
    '&:hover': {
      backgroundColor: '#dbeafe',
      color: '#2563eb',
    },
  },
  signUpButton: {
    textTransform: 'none',
    fontWeight: 600,
    padding: '8px 20px',
    backgroundColor: '#2563eb',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#1d4ed8',
      boxShadow: 'none',
    },
  },
  logoutButton: {
    textTransform: 'none',
    fontWeight: 500,
    padding: '6px 16px',
    color: '#white',
    backgroundColor: '#1976d2',
  },
  mobileLogoutButton: {
    textTransform: 'none',
    fontWeight: 500,
    color: '#ef4444',
    width: '100%',
    justifyContent: 'flex-start',
    padding: '12px 16px',
    '&:hover': {
      backgroundColor: '#fee2e2',
    },
  },
  drawerList: {
    width: 250,
    '& .MuiListItem-root': {
      padding: '4px 16px',
    },
  },
  mobileNavItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    color: '#4b5563',
    '&:hover': {
      backgroundColor: '#f8fafc',
      color: '#2563eb',
    },
  },
};

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    const role = sessionStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userId')
    setUserRole(null);
    navigate('/');
  };

  const getNavigationLinks = () => {
    if (!userRole) return [];
    
    if (userRole === 'student') {
      return [
        { text: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
        { text: 'Find Jobs', href: '/view-jobs', icon: <WorkIcon /> },
        { text: 'Job Status', href: '/job-status', icon: <AssignmentIcon /> },
      ];
    }
    
    if (userRole === 'company') {
      return [
        { text: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
        { text: 'Post Job', href: '/post-job', icon: <BusinessIcon /> },
        { text: 'Applicants', href: '/applicants', icon: <AssignmentIcon /> },
      ];
    }
    
    return [];
  };

  const navigationLinks = getNavigationLinks();

  const renderNavButtons = () => (
    <Stack direction="row" spacing={2} alignItems="center">
      {navigationLinks.map((item) => (
        <Button
          key={item.text}
          startIcon={item.icon}
          onClick={() => navigate(item.href)}
          sx={styles.navButton}
        >
          {item.text}
        </Button>
      ))}
      {userRole && (
        <Button
          variant="contained"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={styles.logoutButton}
        >
          Logout
        </Button>
      )}
      {!userRole && (
        <Button
          color="primary"
          variant="contained"
          onClick={handleSignUp}
          sx={styles.signUpButton}
        >
          Sign Up
        </Button>
      )}
    </Stack>
  );

  const mobileDrawer = (
    <Box sx={{ textAlign: 'center' }}>
      <List sx={styles.drawerList}>
        {navigationLinks.map((item) => (
          <ListItem 
            key={item.text} 
            button 
            onClick={() => {
              navigate(item.href);
              handleDrawerToggle();
            }}
            sx={styles.mobileNavItem}
          >
            {item.icon}
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        {userRole && (
          <ListItem>
            <Button
              fullWidth
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={styles.mobileLogoutButton}
            >
              Logout
            </Button>
          </ListItem>
        )}
        {!userRole && (
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
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" elevation={0} sx={styles.appBar}>
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between', padding: '0.5rem 0' }}>
          <Box sx={styles.logo} display="flex" alignItems="center">
            <Link href="/" underline="none">
              <h1>Job Posting</h1>
            </Link>
          </Box>
          
          {!isMobile && renderNavButtons()}
          
          {isMobile && (
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>
      
      <Drawer
        anchor="right"
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {mobileDrawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;
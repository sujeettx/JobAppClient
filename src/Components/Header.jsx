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
import { useNavigate,useLocation } from 'react-router-dom';
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
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '& h1': {
      background: 'linear-gradient(45deg, #2563eb 30%, #3b82f6 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontSize: '1.75rem',
      fontWeight: '700',
      margin: 0,
      letterSpacing: '-0.5px',
    },
    '& .logo-box': {
      backgroundColor: '#2563eb',
      borderRadius: '8px',
      padding: '4px',
      marginRight: '4px',
      transform: 'rotate(-10deg)',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'rotate(0deg)',
      },
    },
  },
  navButton: {
    textTransform: 'none',
    fontWeight: 500,
    color: '#4b5563',
    padding: '6px 16px',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#f8fafc',
      color: '#2563eb',
    },
  },activeNavButton: {
    backgroundColor: '#eff6ff',
    color: '#2563eb',
    '& .MuiSvgIcon-root': {
      color: '#2563eb', // Ensure the icon is blue
    },
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
    borderRadius: '8px',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#1d4ed8',
      boxShadow: '0 4px 6px -1px rgb(37 99 235 / 0.2)',
    },
  },
  logoutButton: {
    textTransform: 'none',
    fontWeight: 500,
    padding: '6px 16px',
    color: 'white',
    backgroundColor: '#2563eb',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#1d4ed8',
    },
  },
  mobileLogoutButton: {
    textTransform: 'none',
    fontWeight: 500,
    color: '#ef4444',
    width: '100%',
    justifyContent: 'flex-start',
    padding: '12px 16px',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#fee2e2',
    },
  },
  drawerList: {
    width: 250,
    padding: '16px',
    '& .MuiListItem-root': {
      padding: '4px',
      marginBottom: '8px',
    },
  },
  mobileNavItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    color: '#4b5563',
    borderRadius: '8px',
    '& .MuiSvgIcon-root': {
      color: '#4b5563', // Default icon color
    },
    '&:hover': {
      backgroundColor: '#f8fafc',
      color: '#2563eb',
      '& .MuiSvgIcon-root': {
        color: '#2563eb', // Icon turns blue on hover
      },
    },
  },
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSignUp = () => {
    navigate('/signup-student');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    setUserRole(null);
    navigate('/');
  };

  const getNavigationLinks = () => {
    if (!userRole) return [];
    
    if (userRole === 'student') {
      return [
        { text: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
        { text: 'Find Jobs', href: '/view-jobs', icon: <WorkIcon /> },
      ];
    }
    
    if (userRole === 'company') {
      return [
        { text: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
        { text: 'Post Job', href: '/post-job', icon: <BusinessIcon /> },
        { text: 'Applicants', href: '/applicants', icon: <AssignmentIcon /> },
        { text: 'View posted job', href: '/job-list', icon: <WorkIcon /> },   
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
          sx={{
            ...styles.navButton,
            ...(currentPath === item.href && styles.activeNavButton),
          }}
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

  const LogoComponent = () => (
    <Box sx={styles.logo}>
      <Link href="/" underline="none" sx={{ display: 'flex', alignItems: 'center' }}>
        <Box className="logo-box">
          <WorkIcon sx={{ color: 'white', fontSize: '1.25rem' }} />
        </Box>
        <h1>JobBox</h1>
      </Link>
    </Box>
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
            sx={{
              ...styles.mobileNavItem,
              ...(currentPath === item.href && styles.activeNavButton),
            }}
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
        <Toolbar sx={{ justifyContent: 'space-between', padding: '0.75rem 0' }}>
          <LogoComponent />
          
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
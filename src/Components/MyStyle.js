import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4658B8',
      contrastText: '#fff'
    },
    secondary: {
      main: '#f50057'
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#666666'
    },
    background: {
      default: '#ffffff'
    }
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h3: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#1A1A1A',
      marginBottom: '1.5rem',
      lineHeight: 1.2
    },
    body1: {
      fontSize: '1.125rem',
      color: '#666666',
      lineHeight: 1.6
    },
    button: {
      textTransform: 'none',
      fontWeight: 500
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 20px',
        },
      },
    },
  },
});

export const styles = {
  // Header styles
  appBar: {
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 1100
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      height: '32px',
      width: 'auto'
    }
  },
  navLink: {
    color: '#666666',
    fontSize: '0.95rem',
    fontWeight: 500,
    transition: 'color 0.2s ease',
    '&:hover': {
      color: '#4658B8'
    }
  },
  loginButton: {
    color: '#4658B8',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: 'rgba(70, 88, 184, 0.04)'
    }
  },
  signUpButton: {
    fontWeight: 500,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: '#3A4A9F'
    }
  },

  // Main content styles
  mainContainer: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    padding: '4rem 0'
  },
  leftContent: {
    maxWidth: '500px'
  },
  mainTitle: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '1.5rem',
    color: '#1A1A1A',
    lineHeight: 1.2
  },
  ctaButton: {
    marginTop: '1.5rem',
    padding: '12px 32px',
    fontSize: '1.125rem',
    backgroundColor: '#4658B8',
    '&:hover': {
      backgroundColor: '#3A4A9F',
      boxShadow: 'none'
    }
  },
  illustrationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },

  // Footer styles
  footer: {
    backgroundColor: '#f5f5f5',
    padding: '1.5rem 0',
    textAlign: 'center',
    marginTop: 'auto',
    '& a': {
      color: '#666666',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  }
};
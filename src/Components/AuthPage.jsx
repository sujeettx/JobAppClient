import React, { useState } from 'react';
import { Button, Box, Typography, Grid } from '@mui/material';
import LoginForm from './Login';
import SignUpFormStudent from './SignupForStudent';
import SignUpFormCompany from './SignforComapany';
export let changeFormType;
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
  },
  companyButton: {
    marginTop: 1,
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
  const [formType, setFormType] = useState('student'); // 'student', 'company', or 'login'
  const [showPassword, setShowPassword] = useState(false);
  changeFormType = (newFormType) => {
    setFormType(newFormType);
};
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const renderTitle = () => {
    switch(formType) {
      case 'login':
        return 'Welcome Back';
      case 'company':
        return 'Create Company Account';
      default:
        return 'Get Started';
    }
  };

  const renderSubtitle = () => {
    switch(formType) {
      case 'login':
        return 'Login to access your account';
      case 'company':
        return 'Create your company account and start hiring';
      default:
        return 'Create your account and start applying';
    }
  };

  const renderForm = () => {
    switch(formType) {
      case 'login':
        return (
          <LoginForm
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        );
      case 'company':
        return (
          <SignUpFormCompany
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        );
      default:
        return (
          <SignUpFormStudent
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        );
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
              {renderTitle()}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', textAlign: 'center', mb: 3 }}
            >
              {renderSubtitle()}
            </Typography>
            
            {renderForm()}

            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              {formType !== 'login' && (
                <Button
                  fullWidth
                  onClick={() => setFormType('login')}
                  sx={styles.toggleButton}
                >
                  Already have an account? Login
                </Button>
              )}
              
              {formType === 'login' && (
                <Button
                  fullWidth
                  onClick={() => setFormType('student')}
                  sx={styles.toggleButton}
                >
                  Don't have an account? Sign Up
                </Button>
              )}

              {formType !== 'company' && (
                <Button
                  fullWidth
                  onClick={() => setFormType('company')}
                  sx={styles.companyButton}
                >
                  Sign Up as a Company
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthPage;
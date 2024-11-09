import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        marginTop:"8vh",
        maxHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'white',
        p: 4,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '1200px' }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left Content */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: 'center',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2rem', md: '4rem' },
                    fontWeight: 'bold',
                    color: '#1976d2',
                    mr: { md: 2 },
                  }}
                >
                  Oops!
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '4rem', md: '8rem' },
                    fontWeight: 'bold',
                    color: '#2D3748',
                  }}
                >
                  404
                </Typography>
              </Box>
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1A202C' }}>
              Page Not Found
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#718096', mt: 2, maxWidth: 400 }}
            >
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </Typography>

            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Button
                variant="outlined"
                sx={{ borderColor: '#1976d2', color: '#1976d2' }}
                onClick={() => window.history.back()}
              >
                Go Back
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: '#1976d2' }}
                href="/"
              >
                Return Home
              </Button>
            </Box>

            <Typography variant="body2" sx={{ mt: 2, color: '#A0AEC0' }}>
              Need assistance?{' '}
              <a href="/contact" style={{ color: '#1976d2', textDecoration: 'none' }}>
                Contact Support
              </a>
            </Typography>
          </Grid>

          {/* Right Illustration */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
                mb: { xs: 4, md: 0 },
              }}
            >
              {/* Main Circle */}
              <Box
                sx={{
                  width: { xs: '250px', md: '350px' },
                  height: { xs: '250px', md: '350px' },
                  bgcolor: '#EDF2F7',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                {/* Inner Circle */}
                <Box
                  sx={{
                    width: { xs: '150px', md: '200px' },
                    height: { xs: '150px', md: '200px' },
                    bgcolor: '#E2E8F0',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {/* Search Icon */}
                  <Box
                    sx={{
                      width: { xs: '75px', md: '100px' },
                      height: { xs: '75px', md: '100px' },
                      bgcolor: '#CBD5E0',
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: '60%', height: '60%', color: '#1976d2' }}
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </Box>
                </Box>
              </Box>

              {/* Decorative Dots */}
              <Box
                sx={{
                  width: '80px',
                  height: '80px',
                  bgcolor: '#E2E8F0',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: -40,
                  right: -40,
                }}
              ></Box>
              <Box
                sx={{
                  width: '60px',
                  height: '60px',
                  bgcolor: '#E2E8F0',
                  borderRadius: '50%',
                  position: 'absolute',
                  bottom: -40,
                  left: -40,
                }}
              ></Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default NotFoundPage;

export const commonStyles = {
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
    mt: 2,
    py: 1.5,
    borderRadius: 2,
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    background: 'linear-gradient(45deg, #2563eb, #3b82f6)',
    '&:hover': {
      background: 'linear-gradient(45deg, #1d4ed8, #2563eb)',
    },
  },
  inputIcon: {
    mr: 1,
    color: '#3b82f6'
  },
  message: {
    mt: 2,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: '450px',
    p: { xs: 3, md: 4 },
    borderRadius: 4,
    bgcolor: '#fff',
    border: '1px solid rgba(0, 0, 0, 0.06)',
  },
  formGridContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bgcolor: '#fff',
    p: { xs: 2, md: 6 },
  },
  marketingTitle: {
    fontWeight: 700,
    color: '#1e3a8a',
    mb: 3,
    fontSize: { xs: '2rem', md: '2.5rem' },
  },
  marketingSubtitle: {
    color: '#64748b',
    mb: 4,
    maxWidth: '500px',
    lineHeight: 1.6,
  },
  formTitle: {
    fontWeight: 700,
    mb: 0.5,
    textAlign: 'center',
    color: '#2563eb',
  },
  formSubtitle: {
    color: 'text.secondary',
    textAlign: 'center',
    mb: 3,
  },
  toggleButton: {
    mt: 2,
    color: '#2563eb',
    textTransform: 'none',
    fontSize: '0.875rem',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: 'rgba(37, 99, 235, 0.04)',
    },
  },
};
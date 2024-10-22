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

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styles } from './MyStyle';
import JobPostingIllustration from './Assets/Programmer-cuate.svg';

const HomePage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <Container maxWidth="lg" sx={styles.mainContainer}>
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box sx={styles.leftContent}>
            <Typography variant="h3" sx={styles.mainTitle}>
              Connect with Top Tech Talent
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Our job posting platform makes it easy for companies to find and hire the best developers, engineers, and tech professionals.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              sx={styles.ctaButton} 
              onClick={handleSignUp}
            >
              Sign Up to Post a Job
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={styles.illustrationContainer}>
            <img src={JobPostingIllustration} alt="Programmer Illustration" style={{ width: '100%', maxWidth: '600px' }} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
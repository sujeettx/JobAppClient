import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { styles } from './MyStyle';

const Footer = () => {
  return (
    <Box sx={styles.footer}>
      <Container>
        <Typography variant="body2">
          © 2023 Job Posting. All rights reserved.{' '}
          <Link href="/terms" color="inherit">
            Terms of Service
          </Link>{' '}
          |{' '}
          <Link href="/privacy" color="inherit">
            Privacy Policy
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
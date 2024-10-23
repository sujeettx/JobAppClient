import React from 'react';
import { TextField, Button, Box, Typography, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import GroupIcon from '@mui/icons-material/Group';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// Reuse the styles from the main component
const styles = {
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
};

const SignUpForm = ({ showPassword, togglePasswordVisibility }) => {
  return (
    <Box component="form" noValidate autoComplete="off">
      <TextField
        fullWidth
        size="small"
        label="Name"
        variant="outlined"
        margin="dense"
        sx={styles.textField}
        InputProps={{
          startAdornment: <PersonIcon sx={{ mr: 1, color: '#3b82f6' }} />,
        }}
      />
      <TextField
        fullWidth
        size="small"
        label="Phone no."
        variant="outlined"
        margin="dense"
        sx={styles.textField}
        InputProps={{
          startAdornment: <PhoneIcon sx={{ mr: 1, color: '#3b82f6' }} />,
        }}
      />
      <TextField
        fullWidth
        size="small"
        label="Company Name"
        variant="outlined"
        margin="dense"
        sx={styles.textField}
        InputProps={{
          startAdornment: <BusinessIcon sx={{ mr: 1, color: '#3b82f6' }} />,
        }}
      />
      <TextField
        fullWidth
        size="small"
        label="Company Email"
        variant="outlined"
        margin="dense"
        sx={styles.textField}
        InputProps={{
          startAdornment: <EmailIcon sx={{ mr: 1, color: '#3b82f6' }} />,
        }}
      />
      <TextField
        fullWidth
        size="small"
        label="Employee Size"
        variant="outlined"
        margin="dense"
        sx={styles.textField}
        InputProps={{
          startAdornment: <GroupIcon sx={{ mr: 1, color: '#3b82f6' }} />,
        }}
      />
      <TextField
        fullWidth
        size="small"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        margin="dense"
        sx={styles.textField}
        InputProps={{
          startAdornment: <LockIcon sx={{ mr: 1, color: '#3b82f6' }} />,
          endAdornment: (
            <IconButton onClick={togglePasswordVisibility} edge="end" size="small">
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          ),
        }}
      />

      <Typography
        variant="caption"
        sx={{ mt: 1, color: 'text.secondary', textAlign: 'center', display: 'block' }}
      >
        By clicking on proceed, you accept our{' '}
        <a href="#" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500}}>
          Terms & Conditions
        </a>
      </Typography>

      <Button
        fullWidth
        variant="contained"
        sx={styles.submitButton}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUpForm;
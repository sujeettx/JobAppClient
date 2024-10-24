import React from 'react';
import { Alert, AlertTitle, Snackbar } from '@mui/material';

export const Notification = ({ show, message, type = 'success' }) => {
  if (!show) return null;

  return (
    <Snackbar
      open={show}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert severity={type} variant="filled" sx={{ width: '100%' }}>
        <AlertTitle>{type === 'error' ? 'Error' : 'Success'}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;

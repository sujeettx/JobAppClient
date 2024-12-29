import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Divider,
  styled,
  CircularProgress,
  Alert,
  Chip,
  Snackbar,
} from '@mui/material';
import { 
  LocationOn, 
  WorkHistory, 
  ArrowBack,
  AccessTime,
  AttachMoney 
} from '@mui/icons-material';
import axios from 'axios';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)',
    borderRadius: '4px 4px 0 0',
  },
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const SalaryChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.success.light,
  color: theme.palette.success.contrastText,
  fontWeight: 600,
  '& .MuiChip-icon': {
    color: 'inherit',
  },
}));

const DeadlineChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.warning.light,
  color: theme.palette.warning.contrastText,
  fontWeight: 600,
  '& .MuiChip-icon': {
    color: 'inherit',
  },
}));

export const JobDetails = ({ jobId, onBack, authHeader }) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applyLoading, setApplyLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const showToast = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/jobs/${jobId}`,
          authHeader
        );
        setJob(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching job details:', err);
        const errorMessage = err.response?.data?.message || err.response?.data || 'Failed to load job details. Please try again later.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId, authHeader]);

  const handleApply = async () => {
    setApplyLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8080/jobs/${jobId}/apply`,
        {},
        authHeader
      );
      showToast(response.data?.message || 'Applied successfully');
    } catch (err) {
      console.error('Error applying to job:', err);
      // Get error message from different possible locations in the response
      const errorMessage = err.response?.data?.message || 
                          err.response?.data || 
                          err.message || 
                          'Failed to apply. Please try again later.';
      showToast(errorMessage, 'error');
    } finally {
      setApplyLoading(false);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getDaysUntilDeadline = (deadlineDate) => {
    const deadline = new Date(deadlineDate);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={onBack}
          sx={{ mb: 2 }}
        >
          Back to Jobs
        </Button>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!job) return null;

  const daysUntilDeadline = getDaysUntilDeadline(job.deadlineDate);

  return (
    <Container maxWidth="lg">
      <Button
        variant="outlined"
        startIcon={<ArrowBack />}
        onClick={onBack}
        sx={{ mb: 2 }}
      >
        Back to Jobs
      </Button>

      <StyledPaper elevation={2}>
        <Typography variant="h4" component="h1" gutterBottom>
          {job.title}
        </Typography>

        <Typography variant="h5" color="primary" gutterBottom>
          {job.companyId.profile.companyName}
        </Typography>

        <Box sx={{ my: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <SalaryChip 
            icon={<AttachMoney />}
            label={`Salary: ${job.salary}`}
          />
          <DeadlineChip 
            icon={<AccessTime />}
            label={`${daysUntilDeadline} days left · Deadline: ${formatDate(job.deadlineDate)}`}
          />
        </Box>

        <Box sx={{ my: 3 }}>
          <InfoItem>
            <LocationOn color="action" />
            <Typography>{job.location}</Typography>
          </InfoItem>

          <InfoItem>
            <WorkHistory color="action" />
            <Typography>{job.experienceLevel}</Typography>
          </InfoItem>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Job Description
        </Typography>
        <Typography paragraph>{job.description}</Typography>

        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={daysUntilDeadline <= 0 || applyLoading}
            onClick={handleApply}
          >
            {applyLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : daysUntilDeadline <= 0 ? (
              'Application Deadline Passed'
            ) : (
              'Apply Now'
            )}
          </Button>
        </Box>
      </StyledPaper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
          elevation={6}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};
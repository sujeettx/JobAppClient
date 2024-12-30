import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  Link,
} from '@mui/material';
import { 
  LocationOn, 
  WorkHistory, 
  ArrowBack,
  AccessTime,
  AttachMoney,
  Business,
  Work,
  Language,
  Groups,
  Circle
} from '@mui/icons-material';

// Enhanced styled components with modern design
const MainPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(3),
  borderRadius: '16px',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '6px',
    background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
  }
}));

const HeaderSection = styled(Box)({
  marginBottom: '2rem',
});

const CompanyTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
  marginTop: '0.5rem',
  marginBottom: '1.5rem',
}));

const InfoGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(4),
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.background.default,
  borderRadius: '8px',
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
  },
}));

const StyledChip = styled(Chip)(({ theme, variant }) => ({
  borderRadius: '8px',
  padding: '4px 8px',
  height: '36px',
  fontWeight: 500,
  ...(variant === 'salary' && {
    backgroundColor: '#ecfdf5',
    color: '#059669',
    '& .MuiChip-icon': { color: '#059669' },
  }),
  ...(variant === 'deadline' && {
    backgroundColor: '#fff7ed',
    color: '#c2410c',
    '& .MuiChip-icon': { color: '#c2410c' },
  }),
  ...(variant === 'highlight' && {
    backgroundColor: '#f3e8ff',
    color: '#7e22ce',
    margin: '4px',
  }),
  ...(variant === 'skill' && {
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    margin: '4px',
  }),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(4),
}));

const RequirementList = styled(Box)(({ theme }) => ({
  '& > div': {
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
    '& .MuiSvgIcon-root': {
      fontSize: '0.8rem',
      marginTop: '6px',
      color: theme.palette.primary.main,
    },
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
        sx={{ mb: 3, borderRadius: '8px' }}
      >
        Back to Jobs
      </Button>

      <MainPaper elevation={0}>
        <HeaderSection>
          <Typography variant="h4" component="h1" fontWeight="600">
            {job.title}
          </Typography>
          <CompanyTitle variant="h5">
            {job.companyId.profile.companyName}
          </CompanyTitle>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <StyledChip 
              variant="salary"
              icon={<AttachMoney />}
              label={`${job.salary}`}
            />
            <StyledChip 
              variant="deadline"
              icon={<AccessTime />}
              label={`${daysUntilDeadline} days left · Deadline: ${formatDate(job.deadlineDate)}`}
            />
          </Box>
        </HeaderSection>

        <InfoGrid>
          <InfoItem>
            <LocationOn />
            <Typography>{job.location}</Typography>
          </InfoItem>
          <InfoItem>
            <WorkHistory />
            <Typography>{job.experienceLevel}</Typography>
          </InfoItem>
          <InfoItem>
            <Work />
            <Typography>{job.employmentType}</Typography>
          </InfoItem>
          <InfoItem>
            <Groups />
            <Typography>{job.openings} Position(s) Available</Typography>
          </InfoItem>
          <InfoItem>
            <Business />
            <Typography>{job.companyId.profile.industry}</Typography>
          </InfoItem>
          <InfoItem>
            <Language />
            <Link 
              href={job.companyId.profile.website}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'inherit', textDecoration: 'none' }}
            >
              {job.companyId.profile.website}
            </Link>
          </InfoItem>
        </InfoGrid>

        <Divider sx={{ my: 4 }} />

        <Box>
          <SectionTitle variant="h6">
            Job Description
          </SectionTitle>
          <Typography paragraph sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
            {job.description}
          </Typography>

          <SectionTitle variant="h6">
            Requirements
          </SectionTitle>
          <RequirementList>
            {job.requirements.map((requirement, index) => (
              <Box key={index}>
                <Circle />
                <Typography sx={{ color: 'text.secondary' }}>
                  {requirement}
                </Typography>
              </Box>
            ))}
          </RequirementList>

          <SectionTitle variant="h6">
            Job Highlights
          </SectionTitle>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {job.jobHighlights.map((highlight, index) => (
              <StyledChip key={index} variant="highlight" label={highlight} />
            ))}
          </Box>

          <SectionTitle variant="h6">
            Key Skills
          </SectionTitle>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
            {job.keySkills.map((skill, index) => (
              <StyledChip key={index} variant="skill" label={skill} />
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: 6 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={daysUntilDeadline <= 0 || applyLoading}
            onClick={handleApply}
            sx={{
              py: 1.5,
              borderRadius: '8px',
              textTransform: 'none',
              fontSize: '1.1rem',
            }}
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
      </MainPaper>

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
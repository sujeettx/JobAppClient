import React, { useState } from 'react';
import { Box, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Add, Send, Visibility } from '@mui/icons-material';
import axios from 'axios';

// Import modular components
import PostJobForm from './JobPostingForm/PostJobForm';
import JobAlertForm from './JobPostingForm/JobAlertForm';
import ViewJobs from './JobPostingForm/viewJob';

const JobPostingPage = () => {
  const [activeForm, setActiveForm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const styles = {
    root: {
      marginTop: '4vh',
      display: 'flex',
      flexDirection: isSmallScreen ? 'column' : 'row',
      padding: '10px',
      maxHeight: '110vh',
    },
    sidebar: {
      width: isSmallScreen ? '100%' : '250px',
      padding: '20px',
      backgroundColor: '#fff',
      borderRight: isSmallScreen ? 'none' : '1px solid #e0e0e0',
      marginBottom: isSmallScreen ? '20px' : '0',
    },
    mainContent: {
      flex: 1,
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      width: '100%',
      maxWidth: isSmallScreen ? '100%' : '600px',
      position: 'relative',
    },
    closeButton: {
      position: 'absolute',
      right: 8,
      top: 8,
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    chipContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '8px',
    },
    candidateInput: {
      display: 'flex',
      gap: '8px',
    },
    list: {
      width: '100%',
      maxWidth: '600px',
      backgroundColor: theme.palette.background.paper,
    },
  };

  const fetchPostedJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('https://your-api-endpoint.com/jobs');
      setJobs(response.data);
    } catch (err) {
      setError('Failed to fetch jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (activeForm) {
      case 'postJob':
        return <PostJobForm onClose={() => setActiveForm('')} styles={styles} />;
      case 'sendJobAlert':
        return <JobAlertForm onClose={() => setActiveForm('')} styles={styles} />;
      case 'viewJobs':
        return (
          <ViewJobs
            jobs={jobs}
            loading={loading}
            error={error}
            onClose={() => setActiveForm('')}
            styles={styles}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={styles.root}>
      {/* Sidebar */}
      <Box sx={styles.sidebar}>
        <Box sx={styles.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => setActiveForm('postJob')}
          >
            Post Job
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<Send />}
            onClick={() => setActiveForm('sendJobAlert')}
          >
            Send Job Alert
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<Visibility />}
            onClick={() => {
              setActiveForm('viewJobs');
              fetchPostedJobs();
            }}
          >
            View Posted Jobs
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={styles.mainContent}>{renderForm()}</Box>
    </Box>
  );
};

export default JobPostingPage;
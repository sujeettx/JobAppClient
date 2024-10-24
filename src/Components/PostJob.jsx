import React, { useState, useEffect } from 'react';
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
      maxHeight: '75vh',
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
      alignItems: 'flex-start', // Changed to flex-start to avoid stretching
      overflowY: 'auto', // Added scroll for overflow
    },
    card: {
      width: '100%',
      maxWidth: isSmallScreen ? '100%' : '800px', // Increased max width
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
    list: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      maxHeight: '0vh', // Added max height
      overflowY: 'auto', // Added scroll
    },
  };

  // Fetch jobs when component mounts or activeForm changes to 'viewJobs'
  useEffect(() => {
    if (activeForm === 'viewJobs') {
      fetchPostedJobs();
    }
  }, [activeForm]);

  const fetchPostedJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5000/jobs/all', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Fetched jobs:', response.data);
      setJobs(response.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(`Failed to fetch jobs: ${err.message}`);
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
            onRefresh={fetchPostedJobs} // Added refresh capability
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
            fullWidth
          >
            Post Job
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<Send />}
            onClick={() => setActiveForm('sendJobAlert')}
            fullWidth
          >
            Send Job Alert
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<Visibility />}
            onClick={() => setActiveForm('viewJobs')}
            fullWidth
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
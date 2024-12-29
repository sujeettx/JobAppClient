import React, { useState, useEffect } from 'react';
import { Search } from '@mui/icons-material';
import axios from 'axios';
import { JobCard } from './jobs/JobCard';
import { JobDetails } from './jobs/JobDetails';
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  styled,
} from '@mui/material';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const SearchBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));

const GradientTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  background: 'linear-gradient(45deg, #2563eb, #3b82f6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(4),
}));

const FindJobs = () => {
  const API_URL = 'http://localhost:8080/jobs';

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobId, setSelectedJobId] = useState(null);

  const getAuthHeader = () => ({
    headers: {
      Authorization: sessionStorage.getItem('authToken'),
    },
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(API_URL, getAuthHeader());
        setJobs(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(
          err.response?.data?.message || 
          'Failed to load jobs. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.experienceLevel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJobSelect = (jobId) => {
    setSelectedJobId(jobId);
  };

  const handleBack = () => {
    setSelectedJobId(null);
  };

  return (
    <StyledContainer maxWidth="lg">
      {selectedJobId ? (
        <JobDetails 
          jobId={selectedJobId} 
          onBack={handleBack}
          authHeader={getAuthHeader()}
        />
      ) : (
        <>
          <GradientTitle variant="h4" component="h1">
            Find Jobs by Experience Level
          </GradientTitle>

          <SearchBox>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by experience level (e.g., Entry, Mid, Senior)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </SearchBox>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ mb: 4 }}>
              {error}
            </Alert>
          ) : (
            <Grid container spacing={3}>
              {filteredJobs.map((job) => (
                <Grid item xs={12} sm={6} lg={4} key={job._id}>
                  <JobCard 
                    job={job} 
                    onClick={() => handleJobSelect(job._id)} 
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {!loading && filteredJobs.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No jobs found matching the specified experience level.
              </Typography>
            </Box>
          )}
        </>
      )}
    </StyledContainer>
  );
};

export default FindJobs;
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  Chip,
  FormControl,
  InputLabel,
  IconButton,
  useMediaQuery,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Add, Send, Close, Visibility } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios'; // We'll use axios for the API call

const JobPostingPage = () => {
  const [activeForm, setActiveForm] = useState('postJob'); // Default to 'postJob' form
  const [candidates, setCandidates] = useState([]);
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    experienceLevel: '',
    endDate: '',
  });
  const [jobs, setJobs] = useState([]); // State to store jobs fetched from the API
  const [loading, setLoading] = useState(false); // State to handle loading state
  const [error, setError] = useState(''); // State to handle errors during API calls

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

  const handleAddCandidate = () => {
    if (email && !candidates.includes(email)) {
      setCandidates([...candidates, email]);
      setEmail('');
    }
  };

  const handleRemoveCandidate = (emailToRemove) => {
    setCandidates(candidates.filter((email) => email !== emailToRemove));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...formData, candidates });
    setActiveForm(''); // Close form after submission
  };

  const fetchPostedJobs = async () => {
    setLoading(true); // Start loading
    setError(''); // Clear any previous errors

    try {
      // Make API call to fetch posted jobs (replace with your API endpoint)
      const response = await axios.get('https://your-api-endpoint.com/jobs');
      setJobs(response.data); // Assuming the response is an array of jobs
    } catch (err) {
      setError('Failed to fetch jobs. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const renderForm = () => {
    switch (activeForm) {
      case 'postJob':
        return (
          <Card sx={styles.card}>
            <IconButton
              sx={styles.closeButton}
              onClick={() => setActiveForm('')}
              size="small"
            >
              <Close />
            </IconButton>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Post Job 
              </Typography>
              <Box component="form" sx={styles.form} onSubmit={handleSubmit}>
                <TextField
                  label="Job Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  required
                />

                <TextField
                  label="Job Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  fullWidth
                  size="small"
                  required
                />

                <FormControl fullWidth size="small">
                  <InputLabel>Experience Level</InputLabel>
                  <Select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    label="Experience Level"
                  >
                    <MenuItem value="">Select Experience Level</MenuItem>
                    <MenuItem value="entry">Entry Level</MenuItem>
                    <MenuItem value="mid">Mid Level</MenuItem>
                    <MenuItem value="senior">Senior Level</MenuItem>
                    <MenuItem value="expert">Expert Level</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Job Location"
                  name="Location"
                  value={formData.title}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  required
                />

                <TextField
                  label="End Date"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  size="small"
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Post Job
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        );

      case 'sendJobAlert':
        return (
          <Card sx={styles.card}>
            <IconButton
              sx={styles.closeButton}
              onClick={() => setActiveForm('')}
              size="small"
            >
              <Close />
            </IconButton>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Job Alert 
              </Typography>

              <Box component="form" sx={styles.form} onSubmit={handleSubmit}>
                <TextField
                  label="Job Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  required
                />

                <TextField
                  label="Job Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  fullWidth
                  size="small"
                  required
                />

                <FormControl fullWidth size="small">
                  <InputLabel>Experience Level</InputLabel>
                  <Select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    label="Experience Level"
                  >
                    <MenuItem value="">Select Experience Level</MenuItem>
                    <MenuItem value="entry">Entry Level</MenuItem>
                    <MenuItem value="mid">Mid Level</MenuItem>
                    <MenuItem value="senior">Senior Level</MenuItem>
                    <MenuItem value="expert">Expert Level</MenuItem>
                  </Select>
                </FormControl>

                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Add Candidates
                  </Typography>
                  <Box sx={styles.candidateInput}>
                    <TextField
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      fullWidth
                      size="small"
                    />
                    <Button
                      variant="contained"
                      onClick={handleAddCandidate}
                      size="small"
                    >
                      Add
                    </Button>
                  </Box>
                  <Box sx={styles.chipContainer}>
                    {candidates.map((email) => (
                      <Chip
                        key={email}
                        label={email}
                        onDelete={() => handleRemoveCandidate(email)}
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>

                <TextField
                  label="End Date"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  size="small"
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Send Job Alert
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        );

      case 'viewJobs':
        return (
          <Card sx={styles.card}>
            <IconButton
              sx={styles.closeButton}
              onClick={() => setActiveForm('')}
              size="small"
            >
              <Close />
            </IconButton>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Posted Jobs
              </Typography>
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : (
                <List sx={styles.list}>
                  {jobs.length > 0 ? (
                    jobs.map((job, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={job.title}
                          secondary={job.description}
                        />
                      </ListItem>
                    ))
                  ) : (
                    <Typography>No jobs posted yet.</Typography>
                  )}
                </List>
              )}
            </CardContent>
          </Card>
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

// JobAlertForm.js
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
  Snackbar,
  Alert,
  FormHelperText,
} from '@mui/material';
import { Close, Add } from '@mui/icons-material';
import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

const styles = {
  card: {
    position: 'relative',
    width: '90%', // Changed from maxWidth to be more responsive
    maxWidth: '800px', // Increased from 600px
    margin: '20px auto',
    padding: '20px',
    '@media (max-width: 600px)': {
      width: '95%',
      padding: '15px',
    },
  },
  closeButton: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    mt: 2,
  },
  candidateInput: {
    display: 'flex',
    gap: 1,
    mt: 1,
    mb: 1,
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    mt: 1,
    mb: 2,
  },
};

const JobAlertForm = ({ onClose }) => {
  const [candidates, setCandidates] = useState([]);
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    experienceLevel: '',
    endDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddCandidate = () => {
    if (!email) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      return;
    }
    if (!validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: 'Invalid email format' }));
      return;
    }
    if (candidates.includes(email)) {
      setErrors(prev => ({ ...prev, email: 'Email already added' }));
      return;
    }

    setCandidates(prev => [...prev, email]);
    setEmail('');
    setErrors(prev => ({ ...prev, email: '', candidates: '' }));
  };

  const handleRemoveCandidate = (emailToRemove) => {
    setCandidates(prev => prev.filter(email => email !== emailToRemove));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.experienceLevel) newErrors.experienceLevel = 'Experience level is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (candidates.length === 0) newErrors.candidates = 'At least one candidate is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        experienceLevel: formData.experienceLevel,
        endDate: formData.endDate,
        candidates: candidates,
      };

      console.log('Sending payload:', payload); // Debug log

      const response = await api.post('/jobalert/send', payload);

      console.log('Response:', response); // Debug log

      setSnackbar({
        open: true,
        message: 'Job alert sent successfully!',
        severity: 'success',
      });

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          title: '',
          description: '',
          experienceLevel: '',
          endDate: '',
        });
        setCandidates([]);
        onClose?.();
      }, 2000);

    } catch (error) {
      console.error('Full error object:', error); // Debug log
      
      let errorMessage = 'Failed to send job alert. Please try again.';
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        errorMessage = error.response.data.error || errorMessage;
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        errorMessage = error.message;
      }

      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={styles.card}>
      <IconButton
        sx={styles.closeButton}
        onClick={onClose}
        size="small"
        disabled={loading}
      >
        <Close />
      </IconButton>

      <CardContent>
        <Typography variant="h5" color="primary" gutterBottom>
          Send Job Alert
        </Typography>

        <Box component="form" sx={styles.form} onSubmit={handleSubmit}>
          <TextField
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
            size="small"
            disabled={loading}
            required
          />

          <TextField
            label="Job Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
            multiline
            rows={3}
            fullWidth
            size="small"
            disabled={loading}
            required
          />

          <FormControl 
            fullWidth 
            size="small" 
            error={!!errors.experienceLevel}
            required
          >
            <InputLabel>Experience Level</InputLabel>
            <Select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              label="Experience Level"
              disabled={loading}
            >
              <MenuItem value="">Select Level</MenuItem>
              <MenuItem value="entry">Entry Level</MenuItem>
              <MenuItem value="mid">Mid Level</MenuItem>
              <MenuItem value="senior">Senior Level</MenuItem>
              <MenuItem value="expert">Expert Level</MenuItem>
            </Select>
            {errors.experienceLevel && (
              <FormHelperText>{errors.experienceLevel}</FormHelperText>
            )}
          </FormControl>

          <Box>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Add Candidate Emails
            </Typography>
            <Box sx={styles.candidateInput}>
              <TextField
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
                size="small"
                disabled={loading}
              />
              <Button
                variant="contained"
                onClick={handleAddCandidate}
                size="small"
                disabled={loading}
                startIcon={<Add />}
              >
                Add
              </Button>
            </Box>
            {errors.candidates && (
              <FormHelperText error>{errors.candidates}</FormHelperText>
            )}
            <Box sx={styles.chipContainer}>
              {candidates.map((email) => (
                <Chip
                  key={email}
                  label={email}
                  onDelete={() => handleRemoveCandidate(email)}
                  size="small"
                  disabled={loading}
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
            error={!!errors.endDate}
            helperText={errors.endDate}
            InputLabelProps={{ shrink: true }}
            fullWidth
            size="small"
            disabled={loading}
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? 'Sending...' : 'Send Job Alert'}
          </Button>
        </Box>
      </CardContent>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          severity={snackbar.severity} 
          variant="filled"
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default JobAlertForm;
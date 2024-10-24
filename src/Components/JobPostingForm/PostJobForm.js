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
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostJobForm = ({ onClose, styles = {} }) => {
  const defaultStyles = {
    card: {
      maxWidth: 600,
      margin: '0 auto',
      position: 'relative',
      padding: 2,
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
      marginTop: 2,
    },
  };

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    experienceLevel: '',
    location: '',
    salary: '',
    deadlineDate: '', // Match backend field name "deadlineDate"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate form fields
  const validateForm = () => {
    if (!formData.title.trim()) return 'Job title is required';
    if (!formData.description.trim()) return 'Job description is required';
    if (!formData.experienceLevel) return 'Experience level is required';
    if (!formData.location.trim()) return 'Location is required';
    if (!formData.salary || isNaN(Number(formData.salary))) return 'Valid salary is required';
    if (!formData.deadlineDate) return 'Deadline date is required';
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }
  
    setLoading(true);
    setError('');
  
    try {
      const postData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        experienceLevel: formData.experienceLevel,
        location: formData.location.trim(),
        salary: Number(formData.salary),
        DeadlineDate: new Date(formData.deadlineDate).toISOString(),
      };
  
      const response = await fetch('http://localhost:5000/jobs/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(postData),
      });
  
      if (response.ok) {
        // const data = await response.json();
        toast.success('Job posted successfully!'); // Success message
        setFormData({ // Optionally clear the form
          title: '',
          description: '',
          experienceLevel: '',
          location: '',
          salary: '',
          deadlineDate: '',
        });
        if (onClose) onClose();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to post job');
      }
    } catch (err) {
      console.error('Error posting job:', err);
      setError('Failed to post job. Please try again.');
      toast.error('Failed to post job. Please try again.');
    } finally {
      setLoading(false);
    }
  };  

  return (
    <Card sx={{ ...defaultStyles.card, ...styles.card }}>
      {onClose && (
        <IconButton
          sx={{ ...defaultStyles.closeButton, ...styles.closeButton }}
          onClick={onClose}
          size="small"
        >
          <Close />
        </IconButton>
      )}

      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          Post Job
        </Typography>

        <Box
          component="form"
          sx={{ ...defaultStyles.form, ...styles.form }}
          onSubmit={handleSubmit}
          noValidate
        >
          <TextField
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            error={!!error && !formData.title}
          />

          <TextField
            label="Job Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            required
            size="small"
            error={!!error && !formData.description}
          />

          <FormControl fullWidth size="small" required error={!!error && !formData.experienceLevel}>
            <InputLabel>Experience Level</InputLabel>
            <Select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              label="Experience Level"
            >
              <MenuItem value="Entry Level">Entry Level</MenuItem>
              <MenuItem value="Mid Level">Mid Level</MenuItem>
              <MenuItem value="Senior Level">Senior Level</MenuItem>
              <MenuItem value="Expert Level">Expert Level</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Job Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            error={!!error && !formData.location}
          />

          <TextField
            label="Salary"
            name="salary"
            type="number"
            value={formData.salary}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            error={!!error && (!formData.salary || isNaN(Number(formData.salary)))}
            InputProps={{
              inputProps: { min: 0 },
            }}
          />

          <TextField
            label="Deadline Date"
            name="deadlineDate"
            type="date"
            value={formData.deadlineDate}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            error={!!error && !formData.deadlineDate}
            InputLabelProps={{
              shrink: true,
            }}
          />

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Posting...' : 'Post Job'}
            </Button>
          </Box>
        </Box>
      </CardContent>

      <ToastContainer position="top-right" />
    </Card>
  );
};

export default PostJobForm;
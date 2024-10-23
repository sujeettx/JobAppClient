import React from 'react';
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

const PostJobForm = ({ onClose, styles }) => {
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    experienceLevel: '',
    location: '',
    endDate: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  return (
    <Card sx={styles.card}>
      <IconButton
        sx={styles.closeButton}
        onClick={onClose}
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
            name="location"
            value={formData.location}
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
};

export default PostJobForm;
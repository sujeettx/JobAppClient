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
} from '@mui/material';
import { Close } from '@mui/icons-material';

const JobAlertForm = ({ onClose, styles }) => {
  const [candidates, setCandidates] = useState([]);
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    experienceLevel: '',
    endDate: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...formData, candidates });
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
};

export default JobAlertForm;
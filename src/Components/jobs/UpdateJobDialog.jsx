import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem
} from '@mui/material';

export const UpdateJobDialog = ({ 
  open, 
  onClose, 
  formData, 
  onFormChange, 
  onSubmit 
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Update Job</DialogTitle>
      <DialogContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '1rem' }}>
          <TextField
            label="Job Title"
            value={formData.title}
            onChange={(e) => onFormChange('title', e.target.value)}
            fullWidth
          />
          <TextField
            label="Company"
            value={formData.company}
            onChange={(e) => onFormChange('company', e.target.value)}
            fullWidth
          />
          <TextField
            label="Location"
            value={formData.location}
            onChange={(e) => onFormChange('location', e.target.value)}
            fullWidth
          />
          <TextField
            label="Salary"
            type="number"
            value={formData.salary}
            onChange={(e) => onFormChange('salary', e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) => onFormChange('description', e.target.value)}
            multiline
            rows={4}
            fullWidth
          />
          <TextField
            select
            label="Experience Level"
            value={formData.experienceLevel}
            onChange={(e) => onFormChange('experienceLevel', e.target.value)}
            fullWidth
          >
            <MenuItem value="Entry Level">Entry Level</MenuItem>
            <MenuItem value="Mid Level">Mid Level</MenuItem>
            <MenuItem value="Expert Level">Expert Level</MenuItem>
          </TextField>
          <TextField
            label="Deadline Date"
            type="date"
            value={formData.DeadlineDate}
            onChange={(e) => onFormChange('DeadlineDate', e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">Cancel</Button>
        <Button onClick={onSubmit} color="primary" variant="contained">Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateJobDialog;

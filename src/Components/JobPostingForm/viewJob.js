import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Grid,
  IconButton,
  Stack,
} from '@mui/material';
import {
  Close as CloseIcon,
  Refresh as RefreshIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  CalendarToday as CalendarIcon,
  Timer as TimerIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import UpdateJobDialog from '../jobs/UpdateJobDialog';
import Notification from '../jobs/Notification';

const ViewJobs = ({ jobs = [], loading, error, onClose, onRefresh }) => {
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    setOpenUpdateDialog(true);
  };

  const handleDelete = async (job) => {
    try {
      const response = await fetch(`http://localhost:5000/jobs/${job._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete job');
      }

      setNotification({
        show: true,
        message: 'Job deleted successfully',
        type: 'success'
      });

      // Refresh the jobs list
      if (onRefresh) onRefresh();

    } catch (error) {
      setNotification({
        show: true,
        message: error.message || 'Failed to delete job',
        type: 'error'
      });
    }
  };

  const handleUpdateSubmit = async (formData) => {
    try {
      const response = await fetch(`http://localhost:5000/jobs/${selectedJob._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update job');
      }

      setNotification({
        show: true,
        message: 'Job updated successfully',
        type: 'success'
      });

      setOpenUpdateDialog(false);
      
      // Refresh the jobs list
      if (onRefresh) onRefresh();

    } catch (error) {
      setNotification({
        show: true,
        message: error.message || 'Failed to update job',
        type: 'error'
      });
    }
  };

  const handleFormChange = (field, value) => {
    setSelectedJob(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f7fa', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4
      }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#1a237e' }}>
            Posted Jobs ({jobs?.length || 0})
          </Typography>
          <IconButton 
            onClick={onRefresh}
            sx={{ 
              bgcolor: '#e3f2fd',
              '&:hover': { bgcolor: '#bbdefb' }
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Stack>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        {jobs.map((job, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card sx={{
              height: '100%',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
              },
              position: 'relative',
              overflow: 'visible'
            }}>
              {/* Experience Level Badge */}
              <Box sx={{
                position: 'absolute',
                top: -12,
                right: 16,
                bgcolor: job.experienceLevel === 'Entry Level' ? '#4caf50' : 
                         job.experienceLevel === 'Mid Level' ? '#2196f3' : 
                         job.experienceLevel === 'Expert Level' ? '#9c27b0' : '#ff9800',
                color: 'white',
                px: 2,
                py: 0.5,
                borderRadius: 5,
                fontSize: '0.75rem',
                fontWeight: 600,
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}>
                {job.experienceLevel}
              </Box>

              <Box sx={{ p: 3 }}>
                {/* Job Title */}
                <Stack spacing={1} mb={3}>
                  <Typography variant="h6" sx={{ 
                    color: '#1a237e',
                    fontWeight: 600,
                    fontSize: '1.1rem'
                  }}>
                    {job.title}
                  </Typography>
                </Stack>

                {/* Description */}
                <Typography variant="body2" sx={{ 
                  color: '#546e7a',
                  mb: 3,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {job.description}
                </Typography>

                {/* Details Grid */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  {/* Location */}
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <LocationIcon sx={{ color: '#7986cb', fontSize: '1.1rem' }} />
                      <Typography variant="body2" color="text.secondary">
                        {job.location}
                      </Typography>
                    </Stack>
                  </Grid>

                  {/* Salary */}
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <MoneyIcon sx={{ color: '#7986cb', fontSize: '1.1rem' }} />
                      <Typography variant="body2" color="text.secondary">
                        {formatCurrency(job.salary)}/year
                      </Typography>
                    </Stack>
                  </Grid>

                  {/* Posted Date */}
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CalendarIcon sx={{ color: '#7986cb', fontSize: '1.1rem' }} />
                      <Typography variant="body2" color="text.secondary">
                        Posted {new Date(job.Postdate).toLocaleDateString()}
                      </Typography>
                    </Stack>
                  </Grid>

                  {/* Deadline */}
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <TimerIcon sx={{ color: '#7986cb', fontSize: '1.1rem' }} />
                      <Typography variant="body2" color="text.secondary">
                        Deadline: {new Date(job.DeadlineDate).toLocaleDateString()}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>

                {/* Edit and Delete Actions */}
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <IconButton 
                    onClick={() => handleEdit(job)}
                    sx={{
                      color: '#1a237e',
                      '&:hover': { bgcolor: '#e8eaf6' }
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleDelete(job)}
                    sx={{
                      color: '#f44336',
                      '&:hover': { bgcolor: '#ffebee' }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Update Dialog */}
      <UpdateJobDialog
        open={openUpdateDialog}
        onClose={() => setOpenUpdateDialog(false)}
        formData={selectedJob || {}}
        onFormChange={handleFormChange}
        onSubmit={() => handleUpdateSubmit(selectedJob)}
      />

      {/* Notification */}
      <Notification
        show={notification.show}
        message={notification.message}
        type={notification.type}
      />
    </Box>
  );
};

export default ViewJobs;
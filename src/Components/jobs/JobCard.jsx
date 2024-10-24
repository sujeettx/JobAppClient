import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Grid,
  Chip,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  AttachMoney as SalaryIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const JobCard = ({ job, onUpdate, onDelete }) => {
  const getExperienceLevelColor = (level) => {
    switch (level) {
      case 'Entry Level':
        return 'success';
      case 'Mid Level':
        return 'info';
      case 'Expert Level':
        return 'primary';
      case 'Senior Level':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Card sx={{ p: 2, mb: 2, position: 'relative', boxShadow: 3 }}>
      <Chip
        label={job.experienceLevel}
        color={getExperienceLevelColor(job.experienceLevel)}
        sx={{ position: 'absolute', top: 10, right: 10, fontWeight: 'bold' }}
      />
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {job.title}
        </Typography>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <BusinessIcon fontSize="small" color="action" />
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              {job.companyName}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="center" sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center">
              <LocationIcon fontSize="small" color="action" />
              <Typography variant="body2" ml={0.5}>
                {job.location}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center">
              <SalaryIcon fontSize="small" color="action" />
              <Typography variant="body2" ml={0.5}>
                ${job.salary.toLocaleString()}/year
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="center" sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center">
              <CalendarIcon fontSize="small" color="action" />
              <Typography variant="body2" ml={0.5}>
                Posted: {job.postedDate}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center">
              <TimeIcon fontSize="small" color="action" />
              <Typography variant="body2" ml={0.5}>
                Deadline: {job.deadlineDate}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <IconButton
          color="primary"
          onClick={onUpdate}
          sx={{ borderRadius: '50%' }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={onDelete}
          sx={{ borderRadius: '50%' }}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default JobCard;
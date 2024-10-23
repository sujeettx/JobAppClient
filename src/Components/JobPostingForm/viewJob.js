import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Close } from '@mui/icons-material';

const ViewJobs = ({ jobs, loading, error, onClose, styles }) => {
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
};

export default ViewJobs;
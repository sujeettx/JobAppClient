import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  //   CardActions,
  Typography,
  Grid,
  Chip,
  Button,
  Container,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar
} from "@mui/material";
import {
  LocationOn,
  //   Work,
  Group,
  School,
  AttachMoney,
  CalendarToday,
  //   Description,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Business,
} from "@mui/icons-material";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    jobId: null,
  });
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      const companyId = sessionStorage.getItem("userId");

      const response = await fetch(
        `http://localhost:8080/jobs/my/${companyId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    try {
      const token = sessionStorage.getItem("authToken");
      const response = await fetch(`http://localhost:8080/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      if (response.ok) {
        setJobs(jobs.filter((job) => job._id !== jobId));
        setNotification({
          open: true,
          message: "Job deleted successfully!",
          type: "success",
        });
      }
    } catch (error) {
      console.error("Failed to delete job:", error);
      setNotification({
        open: true,
        message: "Failed to delete job",
        type: "error",
      });
    }
    setDeleteDialog({ open: false, jobId: null });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom color="primary" align="center">
        Your Jobs
      </Typography>
      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} key={job._id}>
            <Card elevation={3}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="h5" gutterBottom>
                        {job.title}
                      </Typography>
                      <Box>
                        <IconButton
                          color="primary"
                          onClick={() => console.log("Edit job:", job._id)}
                          sx={{ mr: 1 }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() =>
                            setDeleteDialog({ open: true, jobId: job._id })
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <LocationOn color="primary" />
                      <Typography>{job.location}</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Business color="primary" />
                      <Typography>{job.employmentType}</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Group color="primary" />
                      <Typography>{job.openings} openings</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <School color="primary" />
                      <Typography>{job.experienceLevel}</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <AttachMoney color="primary" />
                      <Typography>{job.salary}</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <CalendarToday color="primary" />
                      <Typography>
                        Deadline: {formatDate(job.deadlineDate)}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Description
                    </Typography>
                    <Typography>{job.description}</Typography>
                  </Grid>

                  {job.jobHighlights.length > 0 && (
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        Job Highlights
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={1}>
                        {job.jobHighlights.map((highlight, index) => (
                          <Chip
                            key={index}
                            label={highlight}
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Grid>
                  )}

                  {job.requirements.length > 0 && (
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        Requirements
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={1}>
                        {job.requirements.map((req, index) => (
                          <Chip
                            key={index}
                            label={req}
                            color="secondary"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Grid>
                  )}

                  {job.keySkills.length > 0 && (
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        Key Skills
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={1}>
                        {job.keySkills.map((skill, index) => (
                          <Chip
                            key={index}
                            label={skill}
                            color="info"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, jobId: null })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this job ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, jobId: null })}>
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(deleteDialog.jobId)}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.type}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default JobListings;

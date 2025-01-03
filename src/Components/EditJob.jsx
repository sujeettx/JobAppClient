import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Container,
  Typography,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";

const EditJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("authToken");
  
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    requirements: [],
    experienceLevel: "",
    employmentType: "",
    openings: 0,
    location: "",
    salary: "",
    deadlineDate: "",
    highlights: [],
    keySkills: [],
  });
  
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "success",
  });

  // Fetch job data when component mounts
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        if (!jobId || !token) {
          navigate('/job-list');
          return;
        }

        const response = await fetch(`http://localhost:8080/jobs/${jobId}`, {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch job data');
        }

        const data = await response.json();
        setJobData(data);
      } catch (error) {
        console.error('Error:', error);
        setNotification({
          open: true,
          message: "Failed to fetch job data",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [jobId, token, navigate]);

  const handleInputChange = (field, value) => {
    setJobData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/jobs/${jobId}`, {
        method: "Patch",
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        setNotification({
          open: true,
          message: "Job updated successfully!",
          type: "success",
        });
        // Navigate after successful update
        setTimeout(() => {
          navigate('/job-list');
        }, 2000);
      } else {
        throw new Error('Failed to update job');
      }
    } catch (error) {
      console.error('Error:', error);
      setNotification({
        open: true,
        message: "Failed to update job",
        type: "error",
      });
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Edit Job
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate('/job-list')}
        >
          Back to Job List
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Job Title"
            value={jobData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Job Description"
            value={jobData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Experience Level"
            value={jobData.experienceLevel}
            onChange={(e) => handleInputChange("experienceLevel", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Employment Type"
            value={jobData.employmentType}
            onChange={(e) => handleInputChange("employmentType", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Openings"
            type="number"
            value={jobData.openings}
            onChange={(e) => handleInputChange("openings", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Location"
            value={jobData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Salary"
            value={jobData.salary}
            onChange={(e) => handleInputChange("salary", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Deadline Date"
            type="date"
            value={jobData.deadlineDate}
            onChange={(e) => handleInputChange("deadlineDate", e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={2}
            label="Highlights (comma separated)"
            value={jobData.highlights.join(", ")}
            onChange={(e) =>
              handleInputChange("highlights", e.target.value.split(", "))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={2}
            label="Key Skills (comma separated)"
            value={jobData.keySkills.join(", ")}
            onChange={(e) =>
              handleInputChange("keySkills", e.target.value.split(", "))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Requirements (comma separated)"
            value={jobData.requirements.join(", ")}
            onChange={(e) =>
              handleInputChange("requirements", e.target.value.split(", "))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Update Job
            </Button>
          </Box>
        </Grid>
      </Grid>

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

export default EditJob;
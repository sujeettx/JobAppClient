import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Container,
  Typography,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Stack,
} from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditJob = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const token = localStorage.getItem("authToken");
  
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

  const [tempInputs, setTempInputs] = useState({
    requirements: "",
    highlights: "",
    keySkills: "",
  });

  const [loading, setLoading] = useState(true);

  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Expert Level'];
  const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        if (!token) {
          throw new Error('No authentication token found');
        }
console.log(token);

        const response = await fetch(`http://https://job-box-server-fn4k.onrender.com/jobs/${jobId}`, {
          method: 'GET',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch job data');
        }

        const data = await response.json();
        
        const formattedData = {
          ...data,
          deadlineDate: data.deadlineDate ? new Date(data.deadlineDate).toISOString().split('T')[0] : '',
          highlights: data.jobHighlights || data.highlights || [],
        };
        
        setJobData(formattedData);
      } catch (error) {
        console.error("Error fetching job data:", error);
        toast.error('Failed to fetch job data');
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJobData();
    }
  }, [jobId, token]);

  const handleInputChange = (field, value) => {
    setJobData(prevData => ({ ...prevData, [field]: value }));
  };

  const handleArrayInput = (field, event) => {
    if (event.key === 'Enter' && tempInputs[field].trim() !== '') {
      event.preventDefault();
      setJobData(prevData => ({
        ...prevData,
        [field]: [...prevData[field], tempInputs[field].trim()]
      }));
      setTempInputs(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleDeleteItem = (field, indexToDelete) => {
    setJobData(prevData => ({
      ...prevData,
      [field]: prevData[field].filter((_, index) => index !== indexToDelete)
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`http://https://job-box-server-fn4k.onrender.com/jobs/${jobId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...jobData,
          jobHighlights: jobData.highlights,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update job');
      }

      toast.success('Job updated successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => {
        navigate('/job-list');
      }, 3000);
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error(error.message || 'Failed to update job', {
        position: "top-right",
        autoClose: 3000,
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
          variant="contained"
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
          <FormControl fullWidth>
            <InputLabel>Experience Level</InputLabel>
            <Select
              value={jobData.experienceLevel}
              label="Experience Level"
              onChange={(e) => handleInputChange("experienceLevel", e.target.value)}
            >
              {experienceLevels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Employment Type</InputLabel>
            <Select
              value={jobData.employmentType}
              label="Employment Type"
              onChange={(e) => handleInputChange("employmentType", e.target.value)}
            >
              {employmentTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            label="Add Highlights (Press Enter to add)"
            value={tempInputs.highlights}
            onChange={(e) => setTempInputs(prev => ({ ...prev, highlights: e.target.value }))}
            onKeyPress={(e) => handleArrayInput("highlights", e)}
          />
          <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
            {jobData.highlights.map((highlight, index) => (
              <Chip
                key={index}
                label={highlight}
                onDelete={() => handleDeleteItem("highlights", index)}
              />
            ))}
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Add Key Skills (Press Enter to add)"
            value={tempInputs.keySkills}
            onChange={(e) => setTempInputs(prev => ({ ...prev, keySkills: e.target.value }))}
            onKeyPress={(e) => handleArrayInput("keySkills", e)}
          />
          <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
            {jobData.keySkills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                onDelete={() => handleDeleteItem("keySkills", index)}
              />
            ))}
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Add Requirements (Press Enter to add)"
            value={tempInputs.requirements}
            onChange={(e) => setTempInputs(prev => ({ ...prev, requirements: e.target.value }))}
            onKeyPress={(e) => handleArrayInput("requirements", e)}
          />
          <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
            {jobData.requirements.map((requirement, index) => (
              <Chip
                key={index}
                label={requirement}
                onDelete={() => handleDeleteItem("requirements", index)}
              />
            ))}
          </Stack>
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
      
      <ToastContainer />
    </Container>
  );
};

export default EditJob;
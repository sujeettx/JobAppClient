import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
  Alert,
  Chip,
  Button,
} from "@mui/material";
import {
  LocationOn,
  Work,
  Group,
  School,
  AttachMoney,
  CalendarToday,
  Description,
  Add,
  Close,
  Business,
} from "@mui/icons-material";

const JobPostingForm = () => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: "", type: "success" });
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    openings: "",
    employmentType: "",
    experienceLevel: "",
    salary: "",
    deadlineDate: "",
    description: "",
    jobHighlights: [],
    requirements: [],
    keySkills: [],
  });

  const [tempInputs, setTempInputs] = useState({
    highlight: "",
    requirement: "",
    skill: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddItem = (field, value) => {
    if (value.trim() && !formData[field].includes(value.trim())) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }));
      setTempInputs((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleRemoveItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch('http://localhost:8080/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(formData)
      });

      if (response.status !== 201) {
        throw new Error('Failed to post job');
      }

      setNotification({
        open: true,
        message: "Job posted successfully!",
        type: "success"
      });

      // Reset form
      setFormData({
        title: "",
        location: "",
        openings: "",
        employmentType: "",
        experienceLevel: "",
        salary: "",
        deadlineDate: "",
        description: "",
        jobHighlights: [],
        requirements: [],
        keySkills: [],
      });

    } catch (error) {
      setNotification({
        open: true,
        message: error.message,
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const renderChipSection = (title, field, tempField) => (
    <Paper elevation={0} sx={{ p: 2, backgroundColor: 'background.default' }}>
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <TextField
          fullWidth
          size="small"
          value={tempInputs[tempField]}
          onChange={(e) =>
            setTempInputs((prev) => ({ ...prev, [tempField]: e.target.value }))
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddItem(field, tempInputs[tempField]);
            }
          }}
        />
        <IconButton
          color="primary"
          onClick={() => handleAddItem(field, tempInputs[tempField])}
        >
          <Add />
        </IconButton>
      </Stack>
      <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
        {formData[field].map((item, index) => (
          <Chip
            key={index}
            label={item}
            onDelete={() => handleRemoveItem(field, index)}
            deleteIcon={<Close />}
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>
    </Paper>
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center" color="primary">
            Post a New Job
          </Typography>
          <Divider sx={{ mb: 4 }} />

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Job Title"
                  fullWidth
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  InputProps={{
                    startAdornment: <Work sx={{ mr: 1, color: "primary.main" }} />,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Location"
                  fullWidth
                  required
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  InputProps={{
                    startAdornment: <LocationOn sx={{ mr: 1, color: "primary.main" }} />,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Number of Openings"
                  fullWidth
                  required
                  type="number"
                  value={formData.openings}
                  onChange={(e) => handleInputChange("openings", e.target.value)}
                  InputProps={{
                    startAdornment: <Group sx={{ mr: 1, color: "primary.main" }} />,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Employment Type"
                  fullWidth
                  required
                  value={formData.employmentType}
                  onChange={(e) => handleInputChange("employmentType", e.target.value)}
                  InputProps={{
                    startAdornment: <Business sx={{ mr: 1, color: "primary.main" }} />,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Experience Level"
                  fullWidth
                  required
                  value={formData.experienceLevel}
                  onChange={(e) => handleInputChange("experienceLevel", e.target.value)}
                  InputProps={{
                    startAdornment: <School sx={{ mr: 1, color: "primary.main" }} />,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Salary Range"
                  fullWidth
                  required
                  value={formData.salary}
                  onChange={(e) => handleInputChange("salary", e.target.value)}
                  InputProps={{
                    startAdornment: <AttachMoney sx={{ mr: 1, color: "primary.main" }} />,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Application Deadline"
                  fullWidth
                  required
                  type="date"
                  value={formData.deadlineDate}
                  onChange={(e) => handleInputChange("deadlineDate", e.target.value)}
                  InputProps={{
                    startAdornment: <CalendarToday sx={{ mr: 1, color: "primary.main" }} />,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Job Description"
                  fullWidth
                  required
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  InputProps={{
                    startAdornment: <Description sx={{ mr: 1, color: "primary.main" }} />,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                {renderChipSection("Job Highlights", "jobHighlights", "highlight")}
              </Grid>

              <Grid item xs={12}>
                {renderChipSection("Requirements", "requirements", "requirement")}
              </Grid>

              <Grid item xs={12}>
                {renderChipSection("Key Skills", "keySkills", "skill")}
              </Grid>
            </Grid>

            <Box mt={4}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={loading}
              >
                {loading ? 'Posting...' : 'Post Job'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

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

export default JobPostingForm;
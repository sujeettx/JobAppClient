import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
  Chip,
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
} from "@mui/icons-material";

const JobPostingForm = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <Box maxWidth="md" mx="auto" p={2}>
      <Card>
        <CardHeader
          title={<Typography variant="h5">Post a New Job</Typography>}
        />
        <Divider />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Job Title"
                  fullWidth
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  InputProps={{
                    startAdornment: <Work fontSize="small" />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Location"
                  fullWidth
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  InputProps={{
                    startAdornment: <LocationOn fontSize="small" />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Number of Openings"
                  fullWidth
                  type="number"
                  value={formData.openings}
                  onChange={(e) => handleInputChange("openings", e.target.value)}
                  InputProps={{
                    startAdornment: <Group fontSize="small" />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Employment Type"
                  fullWidth
                  value={formData.employmentType}
                  onChange={(e) => handleInputChange("employmentType", e.target.value)}
                  placeholder="e.g., Full-time, Part-time"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Experience Level"
                  fullWidth
                  value={formData.experienceLevel}
                  onChange={(e) => handleInputChange("experienceLevel", e.target.value)}
                  placeholder="e.g., Entry, Mid, Senior"
                  InputProps={{
                    startAdornment: <School fontSize="small" />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Salary Range"
                  fullWidth
                  value={formData.salary}
                  onChange={(e) => handleInputChange("salary", e.target.value)}
                  placeholder="e.g., $80,000 - $100,000"
                  InputProps={{
                    startAdornment: <AttachMoney fontSize="small" />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Application Deadline"
                  fullWidth
                  type="date"
                  value={formData.deadlineDate}
                  onChange={(e) => handleInputChange("deadlineDate", e.target.value)}
                  InputProps={{
                    startAdornment: <CalendarToday fontSize="small" />,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Job Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  InputProps={{
                    startAdornment: <Description fontSize="small" />,
                  }}
                />
              </Grid>

              {/* Job Highlights */}
              <Grid item xs={12}>
                <TextField
                  label="Add Job Highlights"
                  fullWidth
                  value={tempInputs.highlight}
                  onChange={(e) =>
                    setTempInputs((prev) => ({ ...prev, highlight: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddItem("jobHighlights", tempInputs.highlight);
                    }
                  }}
                />
                <IconButton
                  onClick={() => handleAddItem("jobHighlights", tempInputs.highlight)}
                >
                  <Add />
                </IconButton>
                <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                  {formData.jobHighlights.map((highlight, index) => (
                    <Chip
                      key={index}
                      label={highlight}
                      onDelete={() => handleRemoveItem("jobHighlights", index)}
                      deleteIcon={<Close />}
                    />
                  ))}
                </Box>
              </Grid>

              {/* Requirements */}
              <Grid item xs={12}>
                <TextField
                  label="Add Requirements"
                  fullWidth
                  value={tempInputs.requirement}
                  onChange={(e) =>
                    setTempInputs((prev) => ({ ...prev, requirement: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddItem("requirements", tempInputs.requirement);
                    }
                  }}
                />
                <IconButton
                  onClick={() => handleAddItem("requirements", tempInputs.requirement)}
                >
                  <Add />
                </IconButton>
                <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                  {formData.requirements.map((req, index) => (
                    <Chip
                      key={index}
                      label={req}
                      onDelete={() => handleRemoveItem("requirements", index)}
                      deleteIcon={<Close />}
                    />
                  ))}
                </Box>
              </Grid>

              {/* Key Skills */}
              <Grid item xs={12}>
                <TextField
                  label="Add Key Skills"
                  fullWidth
                  value={tempInputs.skill}
                  onChange={(e) =>
                    setTempInputs((prev) => ({ ...prev, skill: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddItem("keySkills", tempInputs.skill);
                    }
                  }}
                />
                <IconButton
                  onClick={() => handleAddItem("keySkills", tempInputs.skill)}
                >
                  <Add />
                </IconButton>
                <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                  {formData.keySkills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      onDelete={() => handleRemoveItem("keySkills", index)}
                      deleteIcon={<Close />}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>

            <Box mt={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Post Job
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default JobPostingForm;

import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Box,
} from '@mui/material';
import axios from 'axios';

const UpdateStudentProfile = () => {
  const userId = sessionStorage.getItem('userId'); // Get userId from sessionStorage
  const [profileData, setProfileData] = useState({
    profileImage: '',
    education: [{ degree: '', university: '', year: '', grade: '' }],
    projects: [{ name: '', description: '', link: '', technologies: [] }],
    socialLinks: { linkedin: '', github: '', twitter: '' },
    gender: '',
    dob: '',
    languages: [],
    location: '',
    phoneNumber: '',
  });

  // Fetch user data (optional, if needed to pre-fill the form)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${userId}`);
        setProfileData(response.data.profile);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, [userId]);

  const handleInputChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleNestedInputChange = (key, index, field, value) => {
    const updatedArray = [...profileData[key]];
    updatedArray[index][field] = value;
    setProfileData({ ...profileData, [key]: updatedArray });
  };

  const handleSubmit = async () => {
    try {
      await axios.patch(`http://localhost:8080/users/${userId}`, { profile: profileData });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Update Profile
      </Typography>
      <Box component="form" noValidate>
        <TextField
          fullWidth
          label="Profile Image URL"
          value={profileData.profileImage}
          onChange={(e) => handleInputChange('profileImage', e.target.value)}
          margin="normal"
        />
        <Typography variant="h6" gutterBottom>
          Education
        </Typography>
        {profileData.education.map((edu, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Degree"
                value={edu.degree}
                onChange={(e) =>
                  handleNestedInputChange('education', index, 'degree', e.target.value)
                }
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="University"
                value={edu.university}
                onChange={(e) =>
                  handleNestedInputChange('education', index, 'university', e.target.value)
                }
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Year"
                value={edu.year}
                onChange={(e) =>
                  handleNestedInputChange('education', index, 'year', e.target.value)
                }
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Grade"
                value={edu.grade}
                onChange={(e) =>
                  handleNestedInputChange('education', index, 'grade', e.target.value)
                }
                margin="normal"
              />
            </Grid>
          </Grid>
        ))}
        <Typography variant="h6" gutterBottom>
          Projects
        </Typography>
        {profileData.projects.map((project, index) => (
          <Box key={index} mb={2}>
            <TextField
              fullWidth
              label="Project Name"
              value={project.name}
              onChange={(e) =>
                handleNestedInputChange('projects', index, 'name', e.target.value)
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              value={project.description}
              onChange={(e) =>
                handleNestedInputChange('projects', index, 'description', e.target.value)
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Link"
              value={project.link}
              onChange={(e) =>
                handleNestedInputChange('projects', index, 'link', e.target.value)
              }
              margin="normal"
            />
          </Box>
        ))}
        <Typography variant="h6" gutterBottom>
          Social Links
        </Typography>
        {['linkedin', 'github', 'twitter'].map((platform) => (
          <TextField
            key={platform}
            fullWidth
            label={platform.charAt(0).toUpperCase() + platform.slice(1)}
            value={profileData.socialLinks[platform]}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                socialLinks: { ...profileData.socialLinks, [platform]: e.target.value },
              })
            }
            margin="normal"
          />
        ))}
        <TextField
          fullWidth
          label="Gender"
          value={profileData.gender}
          onChange={(e) => handleInputChange('gender', e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Date of Birth"
          value={profileData.dob}
          onChange={(e) => handleInputChange('dob', e.target.value)}
          margin="normal"
          type="date"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Languages (comma-separated)"
          value={profileData.languages.join(', ')}
          onChange={(e) =>
            handleInputChange('languages', e.target.value.split(',').map((lang) => lang.trim()))
          }
          margin="normal"
        />
        <TextField
          fullWidth
          label="Location"
          value={profileData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Phone Number"
          value={profileData.phoneNumber}
          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 3 }}
        >
          Update
        </Button>
      </Box>
    </Container>
  );
};

export default UpdateStudentProfile;
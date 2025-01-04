import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Box,
  CircularProgress
} from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const UpdateStudentProfile = () => {
  const userId = sessionStorage.getItem('userId');
  const navigate = useNavigate();
  
  // Move initialState outside component to prevent recreation on each render
  const initialState = {
    profileImage: '',
    education: [{ degree: '', university: '', year: '', grade: '' }],
    projects: [{ name: '', description: '', link: '', technologies: [] }],
    socialLinks: { linkedin: '', github: '', twitter: '' },
    gender: '',
    dob: '',
    languages: [],
    location: '',
    phoneNumber: ''
  };

  // Initialize state only once
  const [profileData, setProfileData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!isInitialized) {
        try {
          const response = await fetch(`http://localhost:8080/users/${userId}`);
          const data = await response.json();
          
          if (isMounted) {
            if (data.profile) {
              setProfileData(prevData => ({
                ...prevData,
                ...data.profile,
                education: data.profile.education?.length ? 
                  data.profile.education : prevData.education,
                projects: data.profile.projects?.length ? 
                  data.profile.projects : prevData.projects,
                socialLinks: {
                  ...prevData.socialLinks,
                  ...(data.profile.socialLinks || {})
                },
                languages: Array.isArray(data.profile.languages) ? 
                  data.profile.languages : []
              }));
            }
            setIsInitialized(true);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          if (isMounted) {
            setIsLoading(false);
          }
        }
      }
    };
    
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [userId, isInitialized]);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedInputChange = (key, index, field, value) => {
    setProfileData(prev => {
      const updatedArray = [...prev[key]];
      updatedArray[index] = {
        ...updatedArray[index],
        [field]: value
      };
      return { ...prev, [key]: updatedArray };
    });
  };

  const handleSocialLinksChange = (platform, value) => {
    setProfileData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ profile: profileData })
      });
      
      if (!response.ok) throw new Error('Failed to update profile');
      toast.success('student profile updated successfully!');
    setTimeout(()=>{navigate('/dashboard')},2000)

    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Update Profile
      </Typography>
      
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Profile Image URL"
          value={profileData.profileImage || ''}
          onChange={(e) => handleInputChange('profileImage', e.target.value)}
          margin="normal"
        />

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Education
        </Typography>
        {profileData.education.map((edu, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Degree"
                value={edu.degree || ''}
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
                value={edu.university || ''}
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
                value={edu.year || ''}
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
                value={edu.grade || ''}
                onChange={(e) =>
                  handleNestedInputChange('education', index, 'grade', e.target.value)
                }
                margin="normal"
              />
            </Grid>
          </Grid>
        ))}

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Projects
        </Typography>
        {profileData.projects.map((project, index) => (
          <Box key={index} mb={2}>
            <TextField
              fullWidth
              label="Project Name"
              value={project.name || ''}
              onChange={(e) =>
                handleNestedInputChange('projects', index, 'name', e.target.value)
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              value={project.description || ''}
              onChange={(e) =>
                handleNestedInputChange('projects', index, 'description', e.target.value)
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Link"
              value={project.link || ''}
              onChange={(e) =>
                handleNestedInputChange('projects', index, 'link', e.target.value)
              }
              margin="normal"
            />
          </Box>
        ))}

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Social Links
        </Typography>
        {Object.keys(profileData.socialLinks).map((platform) => (
          <TextField
            key={platform}
            fullWidth
            label={platform.charAt(0).toUpperCase() + platform.slice(1)}
            value={profileData.socialLinks[platform] || ''}
            onChange={(e) => handleSocialLinksChange(platform, e.target.value)}
            margin="normal"
          />
        ))}

        <TextField
          fullWidth
          label="Gender"
          value={profileData.gender || ''}
          onChange={(e) => handleInputChange('gender', e.target.value)}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Date of Birth"
          type="date"
          value={profileData.dob || ''}
          onChange={(e) => handleInputChange('dob', e.target.value)}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          fullWidth
          label="Languages (comma-separated)"
          value={profileData.languages.join(', ')}
          onChange={(e) =>
            handleInputChange('languages', e.target.value.split(',').map(lang => lang.trim()))
          }
          margin="normal"
        />

        <TextField
          fullWidth
          label="Location"
          value={profileData.location || ''}
          onChange={(e) => handleInputChange('location', e.target.value)}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Phone Number"
          value={profileData.phoneNumber || ''}
          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
          margin="normal"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 3 }}
        >
          Update Profile
        </Button>
        <Toaster position="top-right" reverseOrder={false} />
      </Box>
    </Container>
  );
};

export default UpdateStudentProfile;
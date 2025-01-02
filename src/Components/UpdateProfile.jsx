import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
//   IconButton,
  Chip,
  Stack,
  Avatar,
//   Divider,
  InputAdornment,
  MenuItem,
} from '@mui/material';
import {
  Save as SaveIcon,
//   Add as AddIcon,
//   Delete as DeleteIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  GitHub as GitHubIcon,
//   Language as LanguageIcon,
  LocationOn as LocationIcon,
  School as SchoolIcon,
  Business as BusinessIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

const ProfileUpdateForm = () => {
  const [userRole, setUserRole] = useState('');
  const [formData, setFormData] = useState({
    profile: {
      // Common fields
      socialLinks: {
        linkedin: '',
        twitter: '',
        github: '',
      },
      // Student-specific fields
      profileImage: '',
      education: [{
        degree: '',
        university: '',
        year: '',
        grade: '',
      }],
      projects: [{
        name: '',
        description: '',
        link: '',
        technologies: [],
      }],
      languages: [],
      gender: '',
      dob: null,
      location: '',
      phoneNumber: '',
      // Company-specific fields
      logo: '',
      description: '',
      foundedYear: '',
      employeeCount: '',
      mainServices: [],
      headquarters: {
        address: '',
        pinCode: '',
      },
      companyInfo: {
        type: '',
        parentCompany: '',
        stockSymbols: {
          bse: '',
          nse: '',
        },
      },
      contact: {
        phone: '',
        hr: '',
      },
    },
  });

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    const storedUserRole = sessionStorage.getItem('userRole');
    setUserRole(storedUserRole || 'student');

    const fetchProfile = async () => {
      try {
        const response = await fetch(`localhost:8080/users/${userId}`);
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem('userId');
    
    try {
      const response = await fetch(`localhost:8080/users/${userId}`, {
        method: 'Patch',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      profile: {
        ...prev.profile,
        [name]: value,
      },
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      profile: {
        ...prev.profile,
        [parent]: {
          ...prev.profile[parent],
          [field]: value,
        },
      },
    }));
  };

  const handleArrayAdd = (field, value) => {
    setFormData(prev => ({
      profile: {
        ...prev.profile,
        [field]: [...(prev.profile[field] || []), value],
      },
    }));
  };

  const handleArrayRemove = (field, index) => {
    setFormData(prev => ({
      profile: {
        ...prev.profile,
        [field]: prev.profile[field].filter((_, i) => i !== index),
      },
    }));
  };

  const StudentForm = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          src={formData.profile.profileImage}
          sx={{ width: 100, height: 100 }}
        />
        <Box>
          <TextField
            fullWidth
            label="Profile Image URL"
            name="profileImage"
            value={formData.profile.profileImage}
            onChange={handleChange}
            sx={{ mb: 1 }}
          />
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          <SchoolIcon sx={{ mr: 1 }} />
          Education
        </Typography>
        {formData.profile.education.map((edu, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Degree"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEducation = [...formData.profile.education];
                    newEducation[index].degree = e.target.value;
                    handleNestedChange('education', index, newEducation[index]);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="University"
                  value={edu.university}
                  onChange={(e) => {
                    const newEducation = [...formData.profile.education];
                    newEducation[index].university = e.target.value;
                    handleNestedChange('education', index, newEducation[index]);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Year"
                  value={edu.year}
                  onChange={(e) => {
                    const newEducation = [...formData.profile.education];
                    newEducation[index].year = e.target.value;
                    handleNestedChange('education', index, newEducation[index]);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Grade"
                  value={edu.grade}
                  onChange={(e) => {
                    const newEducation = [...formData.profile.education];
                    newEducation[index].grade = e.target.value;
                    handleNestedChange('education', index, newEducation[index]);
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        ))}
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Projects
        </Typography>
        {formData.profile.projects.map((project, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Project Name"
                  value={project.name}
                  onChange={(e) => {
                    const newProjects = [...formData.profile.projects];
                    newProjects[index].name = e.target.value;
                    handleNestedChange('projects', index, newProjects[index]);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={project.description}
                  onChange={(e) => {
                    const newProjects = [...formData.profile.projects];
                    newProjects[index].description = e.target.value;
                    handleNestedChange('projects', index, newProjects[index]);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Project Link"
                  value={project.link}
                  onChange={(e) => {
                    const newProjects = [...formData.profile.projects];
                    newProjects[index].link = e.target.value;
                    handleNestedChange('projects', index, newProjects[index]);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Technologies
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {project.technologies.map((tech, techIndex) => (
                    <Chip
                      key={techIndex}
                      label={tech}
                      onDelete={() => {
                        const newProjects = [...formData.profile.projects];
                        newProjects[index].technologies = project.technologies.filter(
                          (_, i) => i !== techIndex
                        );
                        handleNestedChange('projects', index, newProjects[index]);
                      }}
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Stack>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <TextField
                    size="small"
                    label="Add Technology"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value) {
                        const newProjects = [...formData.profile.projects];
                        newProjects[index].technologies.push(e.target.value);
                        handleNestedChange('projects', index, newProjects[index]);
                        e.target.value = '';
                      }
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Personal Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Gender"
              name="gender"
              value={formData.profile.gender}
              onChange={handleChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of Birth"
                value={formData.profile.dob}
                onChange={(newValue) => {
                  handleChange({
                    target: { name: 'dob', value: newValue },
                  });
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.profile.location}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.profile.phoneNumber}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Languages
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {formData.profile.languages.map((lang, index) => (
            <Chip
              key={index}
              label={lang}
              onDelete={() => handleArrayRemove('languages', index)}
              sx={{ m: 0.5 }}
            />
          ))}
        </Stack>
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <TextField
            size="small"
            label="Add Language"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.target.value) {
                handleArrayAdd('languages', e.target.value);
                e.target.value = '';
              }
            }}
          />
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Social Links
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="LinkedIn"
              value={formData.profile.socialLinks.linkedin}
              onChange={(e) => handleNestedChange('socialLinks', 'linkedin', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkedInIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="GitHub"
              value={formData.profile.socialLinks.github}
              onChange={(e) => handleNestedChange('socialLinks', 'github', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GitHubIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Twitter"
              value={formData.profile.socialLinks.twitter}
              onChange={(e) => handleNestedChange('socialLinks', 'twitter', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TwitterIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
// ... (previous code remains the same until CompanyForm)

const CompanyForm = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          src={formData.profile.logo}
          variant="rounded"
          sx={{ width: 100, height: 100 }}
        />
        <Box>
          <TextField
            fullWidth
            label="Company Logo URL"
            name="logo"
            value={formData.profile.logo}
            onChange={handleChange}
          />
        </Box>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Company Description"
          name="description"
          multiline
          rows={4}
          value={formData.profile.description}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Founded Year"
          name="foundedYear"
          type="number"
          value={formData.profile.foundedYear}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Employee Count"
          name="employeeCount"
          value={formData.profile.employeeCount}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BusinessIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Main Services
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {formData.profile.mainServices?.map((service, index) => (
            <Chip
              key={index}
              label={service}
              onDelete={() => handleArrayRemove('mainServices', index)}
              sx={{ m: 0.5 }}
            />
          ))}
        </Stack>
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <TextField
            size="small"
            label="Add Service"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.target.value) {
                handleArrayAdd('mainServices', e.target.value);
                e.target.value = '';
              }
            }}
          />
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Headquarters
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Address"
              value={formData.profile.headquarters?.address}
              onChange={(e) => handleNestedChange('headquarters', 'address', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Pin Code"
              value={formData.profile.headquarters?.pinCode}
              onChange={(e) => handleNestedChange('headquarters', 'pinCode', e.target.value)}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Company Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Company Type"
              value={formData.profile.companyInfo?.type}
              onChange={(e) => handleNestedChange('companyInfo', 'type', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Parent Company"
              value={formData.profile.companyInfo?.parentCompany}
              onChange={(e) => handleNestedChange('companyInfo', 'parentCompany', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="BSE Symbol"
              value={formData.profile.companyInfo?.stockSymbols?.bse}
              onChange={(e) => {
                const newStockSymbols = {
                  ...formData.profile.companyInfo?.stockSymbols,
                  bse: e.target.value
                };
                handleNestedChange('companyInfo', 'stockSymbols', newStockSymbols);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="NSE Symbol"
              value={formData.profile.companyInfo?.stockSymbols?.nse}
              onChange={(e) => {
                const newStockSymbols = {
                  ...formData.profile.companyInfo?.stockSymbols,
                  nse: e.target.value
                };
                handleNestedChange('companyInfo', 'stockSymbols', newStockSymbols);
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Contact Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              value={formData.profile.contact?.phone}
              onChange={(e) => handleNestedChange('contact', 'phone', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="HR Email"
              value={formData.profile.contact?.hr}
              onChange={(e) => handleNestedChange('contact', 'hr', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Social Links
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="LinkedIn"
              value={formData.profile.socialLinks?.linkedin}
              onChange={(e) => handleNestedChange('socialLinks', 'linkedin', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkedInIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Twitter"
              value={formData.profile.socialLinks?.twitter}
              onChange={(e) => handleNestedChange('socialLinks', 'twitter', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TwitterIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 1200, mx: 'auto', my: 4 }}>
      <form onSubmit={handleSubmit}>
        {userRole === 'student' ? <StudentForm /> : <CompanyForm />}
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            size="large"
          >
            Update Profile
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default ProfileUpdateForm;
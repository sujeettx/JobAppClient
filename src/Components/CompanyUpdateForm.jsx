import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
} from '@mui/material';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const UpdateCompanyProfile = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Get userId from sessionStorage
  const [profileData, setProfileData] = useState({
    logo: '',
    description: '',
    foundedYear: '',
    employeeCount: '',
    mainServices: [],
    headquarters: { address: '', pinCode: '' },
    socialLinks: { linkedin: '', twitter: '' },
    companyInfo: {
      type: '',
      parentCompany: '',
      stockSymbols: { bse: '', nse: '' },
    },
    contact: { phone: '', hr: '' },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${userId}`);
        // Merge the API response with default values
        setProfileData(prevState => ({
          ...prevState,
          ...(response.data.profile || {}),
          mainServices: response.data.profile?.mainServices || [],
          headquarters: {
            address: '',
            pinCode: '',
            ...(response.data.profile?.headquarters || {})
          },
          socialLinks: {
            linkedin: '',
            twitter: '',
            ...(response.data.profile?.socialLinks || {})
          },
          companyInfo: {
            type: '',
            parentCompany: '',
            stockSymbols: {
              bse: '',
              nse: '',
              ...(response.data.profile?.companyInfo?.stockSymbols || {})
            },
            ...(response.data.profile?.companyInfo || {})
          },
          contact: {
            phone: '',
            hr: '',
            ...(response.data.profile?.contact || {})
          }
        }));
      } catch (error) {
        toast.error(error?.message || "Error getting company data");
      }
    };
    fetchData();
  }, [userId]);

  const handleInputChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleNestedInputChange = (key, field, value) => {
    setProfileData(prevState => ({
      ...prevState,
      [key]: {
        ...(prevState[key] || {}),
        [field]: value
      }
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.patch(`http://localhost:8080/users/${userId}`, { profile: profileData });
      toast.success('Company profile updated successfully!');
      setTimeout(() => { navigate('/dashboard') }, 2000)
    } catch (error) {
      toast.error('Failed to update company profile: ', error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Update Company Profile
      </Typography>
      <Box component="form" noValidate>
        <TextField
          fullWidth
          label="Logo URL"
          value={profileData.logo}
          onChange={(e) => handleInputChange('logo', e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          value={profileData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Founded Year"
          value={profileData.foundedYear}
          onChange={(e) => handleInputChange('foundedYear', e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Employee Count"
          value={profileData.employeeCount}
          onChange={(e) => handleInputChange('employeeCount', e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Main Services (comma-separated)"
          value={profileData?.mainServices?.join(', ') || ''}
          onChange={(e) =>
            handleInputChange('mainServices', e.target.value.split(',').map((service) => service.trim()))
          }
          margin="normal"
        />
        <Typography variant="h6" gutterBottom>
          Headquarters
        </Typography>
        <TextField
          fullWidth
          label="Address"
          value={profileData?.headquarters?.address || ''}
          onChange={(e) =>
            handleNestedInputChange('headquarters', 'address', e.target.value)
          }
          margin="normal"
        />
        <TextField
          fullWidth
          label="Pin Code"
          value={profileData.headquarters.pinCode}
          onChange={(e) =>
            handleNestedInputChange('headquarters', 'pinCode', e.target.value)
          }
          margin="normal"
        />
        <Typography variant="h6" gutterBottom>
          Social Links
        </Typography>
        {['linkedin', 'twitter'].map((platform) => (
          <TextField
            key={platform}
            fullWidth
            label={platform.charAt(0).toUpperCase() + platform.slice(1)}
            value={profileData?.socialLinks?.[platform] || ''}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                socialLinks: { ...profileData.socialLinks, [platform]: e.target.value },
              })
            }
            margin="normal"
          />
        ))}
        <Typography variant="h6" gutterBottom>
          Company Info
        </Typography>
        <TextField
          fullWidth
          label="Type"
          value={profileData?.companyInfo?.type || ''}
          onChange={(e) =>
            handleNestedInputChange('companyInfo', 'type', e.target.value)
          }
          margin="normal"
        />
        <TextField
          fullWidth
          label="Parent Company"
          value={profileData?.companyInfo?.parentCompany || ''}
          onChange={(e) =>
            handleNestedInputChange('companyInfo', 'parentCompany', e.target.value)
          }
          margin="normal"
        />
        <TextField
          fullWidth
          label="BSE Stock Symbol"
          value={profileData?.companyInfo?.stockSymbols?.bse || ''}
          onChange={(e) =>
            setProfileData({
              ...profileData,
              companyInfo: {
                ...profileData.companyInfo,
                stockSymbols: {
                  ...profileData.companyInfo.stockSymbols,
                  bse: e.target.value,
                },
              },
            })
          }
          margin="normal"
        />
        <TextField
          fullWidth
          label="NSE Stock Symbol"
          value={profileData?.companyInfo?.stockSymbols?.nse || ''}
          onChange={(e) =>
            setProfileData({
              ...profileData,
              companyInfo: {
                ...profileData.companyInfo,
                stockSymbols: {
                  ...profileData.companyInfo.stockSymbols,
                  nse: e.target.value,
                },
              },
            })
          }
          margin="normal"
        />
        <Typography variant="h6" gutterBottom>
          Contact
        </Typography>
        <TextField
          fullWidth
          label="Phone"
          value={profileData?.contact?.phone || ''}
          onChange={(e) =>
            handleNestedInputChange('contact', 'phone', e.target.value)
          }
          margin="normal"
        />
        <TextField
          fullWidth
          label="HR Email"
          value={profileData?.contact?.hr || ''}
          onChange={(e) =>
            handleNestedInputChange('contact', 'hr', e.target.value)
          }
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

export default UpdateCompanyProfile;
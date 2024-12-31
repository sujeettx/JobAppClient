import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  Box,
  Chip,
  Link,
  Skeleton,
} from '@mui/material';
import {
  Mail as MailIcon,
  Phone as PhoneIcon,
  Code as CodeIcon,
  Public as PublicIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
} from '@mui/icons-material';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        const { data } = await axios.get(`http://localhost:8080/users/${userId}`);
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <Box p={3}>
        <Skeleton variant="rectangular" width="100%" height={200} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3} color="error.main">
        Error loading dashboard: {error}
      </Box>
    );
  }

  const { profile } = userData;

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={3}>
                <Avatar
                  src={profile?.profileImage}
                  alt={profile?.fullName}
                  sx={{ width: 64, height: 64 }}
                />
                <Box>
                  <Typography variant="h5">{profile?.fullName}</Typography>
                  <Typography color="textSecondary">
                    <MailIcon fontSize="small" /> {userData.email}
                  </Typography>
                  {profile?.phoneNumber && (
                    <Typography color="textSecondary">
                      <PhoneIcon fontSize="small" /> {profile.phoneNumber}
                    </Typography>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Skills & Languages */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <CodeIcon fontSize="small" /> Skills
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {profile?.skills?.map((skill) => (
                  <Chip key={skill} label={skill} color="primary" variant="outlined" />
                ))}
              </Box>
              <Typography variant="h6" gutterBottom mt={3}>
                <PublicIcon fontSize="small" /> Languages
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {profile?.languages?.map((language) => (
                  <Chip key={language} label={language} color="success" variant="outlined" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Education */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <SchoolIcon fontSize="small" /> Education
              </Typography>
              {profile?.education?.map((edu, index) => (
                <Box key={index} mb={2}>
                  <Typography variant="subtitle1">{edu.degree}</Typography>
                  <Typography color="textSecondary">{edu.university}</Typography>
                  <Typography color="textSecondary">
                    {edu.year} • {edu.grade}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Projects */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <WorkIcon fontSize="small" /> Projects
              </Typography>
              <Grid container spacing={2}>
                {profile?.projects?.map((project, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6">{project.name}</Typography>
                        <Typography color="textSecondary" mb={1}>
                          {project.description}
                        </Typography>
                        <Link href={project.link} target="_blank" rel="noopener">
                          View Project
                        </Link>
                        <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                          {project.technologies.map((tech) => (
                            <Chip key={tech} label={tech} variant="outlined" />
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Social Links */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Social Links
              </Typography>
              <Box display="flex" gap={3}>
                {profile?.socialLinks?.linkedin && (
                  <Link href={profile.socialLinks.linkedin} target="_blank" rel="noopener">
                    <LinkedInIcon /> LinkedIn
                  </Link>
                )}
                {profile?.socialLinks?.github && (
                  <Link href={profile.socialLinks.github} target="_blank" rel="noopener">
                    <GitHubIcon /> GitHub
                  </Link>
                )}
                {profile?.socialLinks?.twitter && (
                  <Link href={profile.socialLinks.twitter} target="_blank" rel="noopener">
                    <TwitterIcon /> Twitter
                  </Link>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

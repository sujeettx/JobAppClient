import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  // Divider,
  Grid,
  Link,
  Skeleton,
  Typography,
  Alert
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  Business,
  People,
  CalendarToday,
  Language,
  Code,
  School,
  Work,
  Translate,
  Description,
  GitHub,
  Twitter,
  LinkedIn
} from '@mui/icons-material';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userRole = sessionStorage.getItem('userRole');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(`http://localhost:8080/users/${userId}`);
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const InfoChip = ({ icon: Icon, text, color = "primary" }) => (
    <Chip
      icon={<Icon sx={{ fontSize: 16 }} />}
      label={text}
      size="small"
      color={color}
      variant="outlined"
      sx={{ m: 0.5 }}
    />
  );

  const SectionHeader = ({ icon: Icon, title }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
      <Icon color="primary" />
      <Typography variant="h6">{title}</Typography>
    </Box>
  );

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {[1, 2, 3].map((i) => (
            <Grid item xs={12} key={i}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">Error loading dashboard: {error}</Alert>
      </Container>
    );
  }

  const { profile } = userData || {};

  const StudentView = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Profile Header */}
      <Card elevation={2}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
            <Avatar
              sx={{ width: 100, height: 100, bgcolor: 'primary.light', fontSize: '2.5rem' }}
            >
              {profile?.fullName?.[0]?.toUpperCase() || '?'}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" gutterBottom>
                {profile?.fullName}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {userData?.email && <InfoChip icon={Email} text={userData.email} />}
                {profile?.phoneNumber && <InfoChip icon={Phone} text={profile.phoneNumber} />}
                {profile?.location && <InfoChip icon={LocationOn} text={profile.location} />}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Skills & Languages */}
      <Grid container spacing={3}>
        {profile?.skills?.length > 0 && (
          <Grid item xs={12} md={6}>
            <Card elevation={2}>
              <CardContent sx={{ p: 3 }}>
                <SectionHeader icon={Code} title="Skills" />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {profile.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {profile?.languages?.length > 0 && (
          <Grid item xs={12} md={6}>
            <Card elevation={2}>
              <CardContent sx={{ p: 3 }}>
                <SectionHeader icon={Translate} title="Languages" />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {profile.languages.map((language) => (
                    <Chip
                      key={language}
                      label={language}
                      color="success"
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Education */}
      {profile?.education?.length > 0 && (
        <Card elevation={2}>
          <CardContent sx={{ p: 3 }}>
            <SectionHeader icon={School} title="Education" />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {profile.education.map((edu, index) => (
                <Box
                  key={index}
                  sx={{
                    borderLeft: 3,
                    borderColor: 'primary.main',
                    pl: 2,
                  }}
                >
                  <Typography variant="h6" color="primary">
                    {edu.degree}
                  </Typography>
                  <Typography variant="body1">{edu.university}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {edu.year} • {edu.grade}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Projects */}
      {profile?.projects?.length > 0 && (
        <Card elevation={2}>
          <CardContent sx={{ p: 3 }}>
            <SectionHeader icon={Work} title="Projects" />
            <Grid container spacing={3}>
              {profile.projects.map((project, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" color="primary" gutterBottom>
                        {project.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {project.description}
                      </Typography>
                      {project.link && (
                        <Link
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 2,
                            color: 'primary.main',
                          }}
                        >
                          <GitHub fontSize="small" />
                          View Project
                        </Link>
                      )}
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {project.technologies.map((tech) => (
                          <Chip
                            key={tech}
                            label={tech}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}
    </Box>
  );

  const CompanyView = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Company Header */}
      <Card elevation={2}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
            <Avatar
              src={profile?.logo}
              sx={{ width: 100, height: 100, bgcolor: 'primary.light', fontSize: '2.5rem' }}
            >
              {profile?.companyName?.[0]?.toUpperCase() || 'C'}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" gutterBottom>
                {profile?.companyName}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {profile?.industry && <InfoChip icon={Business} text={profile.industry} />}
                {profile?.location && <InfoChip icon={LocationOn} text={profile.location} />}
                {userData?.email && <InfoChip icon={Email} text={userData.email} />}
                {profile?.contact?.phone && (
                  <InfoChip icon={Phone} text={profile.contact.phone} />
                )}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Company Details */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent sx={{ p: 3 }}>
              <SectionHeader icon={Business} title="Company Details" />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {profile?.foundedYear && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarToday color="primary" fontSize="small" />
                    <Typography>Founded: {profile.foundedYear}</Typography>
                  </Box>
                )}
                {profile?.employeeCount && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <People color="primary" fontSize="small" />
                    <Typography>Employees: {profile.employeeCount}</Typography>
                  </Box>
                )}
                {profile?.companyInfo?.type && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Business color="primary" fontSize="small" />
                    <Typography>Type: {profile.companyInfo.type}</Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {profile?.mainServices?.length > 0 && (
          <Grid item xs={12} md={6}>
            <Card elevation={2}>
              <CardContent sx={{ p: 3 }}>
                <SectionHeader icon={Work} title="Main Services" />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {profile.mainServices.map((service) => (
                    <Chip
                      key={service}
                      label={service}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* About Company */}
      {profile?.description && (
        <Card elevation={2}>
          <CardContent sx={{ p: 3 }}>
            <SectionHeader icon={Description} title="About Company" />
            <Typography color="text.secondary" paragraph>
              {profile.description}
            </Typography>
            {profile?.headquarters && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Headquarters
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn color="primary" fontSize="small" />
                  <Typography color="text.secondary">
                    {profile.headquarters.address}, {profile.headquarters.pinCode}
                  </Typography>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {userRole === 'student' ? <StudentView /> : <CompanyView />}

      {/* Social Links */}
      {profile?.socialLinks && Object.keys(profile.socialLinks).length > 0 && (
        <Card elevation={2} sx={{ mt: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <SectionHeader icon={Language} title="Social Links" />
            <Box sx={{ display: 'flex', gap: 3 }}>
              {profile.socialLinks.linkedin && (
                <Link
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: '#0077b5',
                    textDecoration: 'none',
                    '&:hover': { color: '#004d77' },
                  }}
                >
                  <LinkedIn />
                  <Typography>LinkedIn</Typography>
                </Link>
              )}
              {profile.socialLinks.github && (
                <Link
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: '#333',
                    textDecoration: 'none',
                    '&:hover': { color: '#000' },
                  }}
                >
                  <GitHub />
                  <Typography>GitHub</Typography>
                </Link>
              )}
              {profile.socialLinks.twitter && (
                <Link
                  href={profile.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: '#1DA1F2',
                    textDecoration: 'none',
                    '&:hover': { color: '#0c85d0' },
                  }}
                >
                  <Twitter />
                  <Typography>Twitter</Typography>
                </Link>
              )}
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Dashboard;
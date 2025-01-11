import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Collapse,
  Grid,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ChevronDown,
  User,
  GraduationCap,
  MapPin,
  Phone,
  FileText,
  Globe,
  Briefcase,
  Building2,
  Calendar
} from 'lucide-react';

const JobsDashboard = () => {
  const [jobsData, setJobsData] = useState([]);
  const [expandedJob, setExpandedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("authToken");
  
        if (!userId || !token) {
          throw new Error('Authentication credentials not found');
        }
  
        const response = await fetch(`http://localhost:8080/jobs/applicants/${userId}`, {
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        setJobsData(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (err) {
      return 'Invalid Date';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ 
        mb: 4, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Briefcase size={32} />
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            component="h1"
            sx={{ fontWeight: 600 }}
          >
            Applicants Dashboard
          </Typography>
        </Box>
        <Chip 
          label={`${jobsData.length} Jobs Posted`}
          color="primary"
          sx={{ 
            borderRadius: '16px',
            px: 1,
            height: 32,
            fontWeight: 500
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {jobsData.map((job, index) => (
          <Grid item xs={12} key={index}>
            <Card sx={{ 
              borderRadius: 2,
              boxShadow: theme.shadows[1]
            }}>
              <CardContent sx={{ '&:last-child': { pb: 2 } }}>
                <Box 
                  onClick={() => setExpandedJob(expandedJob === index ? null : index)}
                  sx={{ 
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        mb: 1
                      }}
                    >
                      <Building2 size={20} />
                      {job.jobTitle}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <User size={16} />
                      <Typography variant="body2" color="text.secondary">
                        Applicants
                      </Typography>
                      <Chip
                        label={job.applicants.length}
                        size="small"
                        color={job.applicants.length > 0 ? "primary" : "default"}
                        sx={{ 
                          height: 24,
                          minWidth: 24,
                          borderRadius: '12px'
                        }}
                      />
                    </Box>
                  </Box>
                  {job.applicants.length > 0 && (
                    <IconButton 
                      size="small"
                      sx={{ 
                        transform: expandedJob === index ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s'
                      }}
                    >
                      <ChevronDown size={20} />
                    </IconButton>
                  )}
                </Box>

                <Collapse in={expandedJob === index}>
                  <Box sx={{ mt: 3 }}>
                    {job.applicants.length > 0 ? (
                      job.applicants.map((applicant, appIndex) => (
                        <Paper 
                          key={appIndex} 
                          elevation={1}
                          sx={{ 
                            p: 3, 
                            mb: 2,
                            borderRadius: 2,
                            ':last-child': { mb: 0 }
                          }}
                        >
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                              <Typography 
                                variant="h6" 
                                sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  gap: 1,
                                  mb: 2 
                                }}
                              >
                                <User size={20} />
                                {applicant.student}
                              </Typography>
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 1,
                                    color: 'text.secondary'
                                  }}
                                >
                                  <MapPin size={16} />
                                  {applicant.location}
                                </Typography>
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 1,
                                    color: 'text.secondary'
                                  }}
                                >
                                  <Calendar size={16} />
                                  Applied: {formatDate(applicant.appliedAt)}
                                </Typography>
                              </Box>
                            </Grid>

                            <Grid item xs={12} md={4}>
                              <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                  mb: 2, 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  gap: 1,
                                  fontWeight: 500
                                }}
                              >
                                <GraduationCap size={20} />
                                Education
                              </Typography>
                              {applicant.education[0] && (
                                <Box sx={{ pl: 0.5 }}>
                                  <Typography variant="body2" fontWeight={500}>
                                    {applicant.education[0].degree}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                    {applicant.education[0].university}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                    {applicant.education[0].year} • {applicant.education[0].grade}
                                  </Typography>
                                </Box>
                              )}
                            </Grid>

                            <Grid item xs={12} md={4}>
                              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                                Skills
                              </Typography>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {applicant.skills.map((skill, skillIndex) => (
                                  <Chip
                                    key={skillIndex}
                                    label={skill}
                                    size="small"
                                    variant="outlined"
                                    sx={{ borderRadius: '12px' }}
                                  />
                                ))}
                              </Box>
                            </Grid>
                          </Grid>

                          <Box sx={{ 
                            display: 'flex', 
                            gap: 2, 
                            mt: 3,
                            flexWrap: 'wrap'
                          }}>
                            <Button
                              variant="contained"
                              startIcon={<FileText size={16} />}
                              href={applicant.resume}
                              target="_blank"
                              rel="noopener noreferrer"
                              size="small"
                              sx={{ borderRadius: '8px' }}
                            >
                              Resume
                            </Button>
                            <Button
                              variant="outlined"
                              startIcon={<Globe size={16} />}
                              href={applicant.portfolio}
                              target="_blank"
                              rel="noopener noreferrer"
                              size="small"
                              sx={{ borderRadius: '8px' }}
                            >
                              Portfolio
                            </Button>
                            <Button
                              variant="outlined"
                              startIcon={<Phone size={16} />}
                              href={`tel:${applicant.phoneNumber}`}
                              size="small"
                              sx={{ borderRadius: '8px' }}
                            >
                              {applicant.phoneNumber}
                            </Button>
                          </Box>
                        </Paper>
                      ))
                    ) : (
                      <Alert 
                        severity="info" 
                        sx={{ 
                          mt: 2,
                          borderRadius: 2
                        }}
                      >
                        No applicants yet for this position.
                      </Alert>
                    )}
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default JobsDashboard;
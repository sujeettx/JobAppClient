import React, { useState, useEffect } from "react";
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
  useMediaQuery,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
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
  Calendar,
} from "lucide-react";

const JobsDashboard = () => {
  const [jobsData, setJobsData] = useState([]);
  const [expandedJob, setExpandedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusLoading, setStatusLoading] = useState({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchJobs = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("authToken");

      if (!userId || !token) {
        throw new Error("Authentication credentials not found");
      }

      const response = await fetch(
        `https://jobappserver-1.onrender.com/jobs/applicants/${userId}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch data");
      }

      const data = await response.json();
      setJobsData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const updateApplicationStatus = async (jobId, applicantId, newStatus) => {
    const loadingKey = `${jobId}-${applicantId}`;
    setStatusLoading((prev) => ({ ...prev, [loadingKey]: true }));
    setError(null);

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      // Log the update attempt
      console.log("Updating status:", { jobId, applicantId, newStatus });

      const response = await fetch(
        `https://jobappserver-1.onrender.com/jobs/${jobId}/status/${applicantId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      // Update local state after successful API call
      setJobsData((prevJobs) =>
        prevJobs.map((job) => {
          if (job.jobid === jobId) {
            return {
              ...job,
              applicants: job.applicants.map((applicant) => {
                if (applicant.studentid === applicantId) {
                  return { ...applicant, status: newStatus };
                }
                return applicant;
              }),
            };
          }
          return job;
        })
      );
    } catch (err) {
      console.error("Status update error:", err);
      setError(err.message || "Failed to update application status");
    } finally {
      setStatusLoading((prev) => ({ ...prev, [loadingKey]: false }));
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (err) {
      return "Invalid Date";
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      hired: "success",
      accepted: "primary",
      rejected: "error",
      pending: "warning",
    };
    return statusColors[status] || "default";
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3, borderRadius: 2 }}
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}

      <Box
        sx={{
          mb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
            borderRadius: "16px",
            px: 1,
            height: 32,
            fontWeight: 500,
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {jobsData.map((job, index) => (
          <Grid item xs={12} key={job.jobid || index}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: theme.shadows[1],
              }}
            >
              <CardContent sx={{ "&:last-child": { pb: 2 } }}>
                <Box
                  onClick={() =>
                    setExpandedJob(expandedJob === index ? null : index)
                  }
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <Building2 size={20} />
                      {job.jobTitle}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <User size={16} />
                      <Typography variant="body2" color="text.secondary">
                        Applicants
                      </Typography>
                      <Chip
                        label={job.applicants?.length || 0}
                        size="small"
                        color={
                          job.applicants?.length > 0 ? "primary" : "default"
                        }
                        sx={{
                          height: 24,
                          minWidth: 24,
                          borderRadius: "12px",
                        }}
                      />
                    </Box>
                  </Box>
                  {job.applicants?.length > 0 && (
                    <IconButton
                      size="small"
                      sx={{
                        transform:
                          expandedJob === index ? "rotate(180deg)" : "none",
                        transition: "transform 0.2s",
                      }}
                    >
                      <ChevronDown size={20} />
                    </IconButton>
                  )}
                </Box>

                <Collapse in={expandedJob === index}>
                  <Box sx={{ mt: 3 }}>
                    {job.applicants?.length > 0 ? (
                      job.applicants.map((applicant, appIndex) => (
                        <Paper
                          key={applicant.studentid || appIndex}
                          elevation={1}
                          sx={{
                            p: 3,
                            mb: 2,
                            borderRadius: 2,
                            ":last-child": { mb: 0 },
                          }}
                        >
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "flex-start",
                                  mb: 2,
                                }}
                              >
                                <Box>
                                  <Typography
                                    variant="h6"
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                    }}
                                  >
                                    <User size={20} />
                                    {applicant.student}
                                  </Typography>
                                  <Chip
                                    label={applicant.status || "pending"}
                                    color={getStatusColor(applicant.status)}
                                    size="small"
                                    sx={{ mt: 1, textTransform: "capitalize" }}
                                  />
                                </Box>
                                <FormControl
                                  size="small"
                                  sx={{ minWidth: 120 }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Select
                                    value={applicant.status || "pending"}
                                    onChange={(e) =>
                                      updateApplicationStatus(
                                        job.jobid,
                                        applicant.studentid,
                                        e.target.value
                                      )
                                    }
                                    disabled={
                                      statusLoading[
                                        `${job.jobid}-${applicant.studentid}`
                                      ]
                                    }
                                    sx={{
                                      borderRadius: "8px",
                                      "& .MuiSelect-select": { py: 1 },
                                    }}
                                  >
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="accepted">
                                      Accepted
                                    </MenuItem>
                                    <MenuItem value="rejected">
                                      Rejected
                                    </MenuItem>
                                    <MenuItem value="hired">Hired</MenuItem>
                                  </Select>
                                </FormControl>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: 1.5,
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    color: "text.secondary",
                                  }}
                                >
                                  <MapPin size={16} />
                                  {applicant?.location ||
                                    "Location not specified"}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    color: "text.secondary",
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
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                  fontWeight: 500,
                                }}
                              >
                                <GraduationCap size={20} />
                                Education
                              </Typography>
                              {applicant?.education?.[0] && (
                                <Box sx={{ pl: 0.5 }}>
                                  <Typography variant="body2" fontWeight={500}>
                                    {applicant.education[0].degree}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mt: 0.5 }}
                                  >
                                    {applicant.education[0].university}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mt: 0.5 }}
                                  >
                                    {applicant.education[0].year} •{" "}
                                    {applicant.education[0].grade}
                                  </Typography>
                                </Box>
                              )}
                            </Grid>

                            <Grid item xs={12} md={4}>
                              <Typography
                                variant="subtitle1"
                                sx={{ mb: 2, fontWeight: 500 }}
                              >
                                Skills
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 1,
                                }}
                              >
                                {applicant.skills?.map((skill, skillIndex) => (
                                  <Chip
                                    key={skillIndex}
                                    label={skill}
                                    size="small"
                                    variant="outlined"
                                    sx={{ borderRadius: "12px" }}
                                  />
                                ))}
                              </Box>
                            </Grid>
                          </Grid>

                          <Box
                            sx={{
                              display: "flex",
                              gap: 2,
                              mt: 3,
                              flexWrap: "wrap",
                            }}
                          >
                            {applicant.resume && (
                              <Button
                                variant="contained"
                                startIcon={<FileText size={16} />}
                                href={applicant.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                size="small"
                                sx={{ borderRadius: "8px" }}
                              >
                                Resume
                              </Button>
                            )}
                            {applicant.portfolio && (
                              <Button
                                variant="outlined"
                                startIcon={<Globe size={16} />}
                                href={applicant.portfolio}
                                target="_blank"
                                rel="noopener noreferrer"
                                size="small"
                                sx={{ borderRadius: "8px" }}
                              >
                                Portfolio
                              </Button>
                            )}
                            {applicant.phoneNumber && (
                              <Button
                                variant="outlined"
                                startIcon={<Phone size={16} />}
                                href={`tel:${applicant.phoneNumber}`}
                                size="small"
                                sx={{ borderRadius: "8px" }}
                              >
                                {applicant.phoneNumber}
                              </Button>
                            )}
                          </Box>
                        </Paper>
                      ))
                    ) : (
                      <Alert
                        severity="info"
                        sx={{
                          mt: 2,
                          borderRadius: 2,
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

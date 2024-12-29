import React from 'react';
import { Card, CardContent, Typography, Box, styled } from '@mui/material';
import { LocationOn, WorkHistory } from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'visible',
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)',
    borderRadius: '4px 4px 0 0',
  },
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export const JobCard = ({ job, onClick }) => {
  return (
    <StyledCard onClick={onClick}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 600 }}>
          {job.title}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            {job.companyId.profile.companyName}
          </Typography>
        </Box>

        <InfoItem>
          <WorkHistory fontSize="small" />
          <Typography variant="body2">{job.experienceLevel}</Typography>
        </InfoItem>

        <InfoItem>
          <LocationOn fontSize="small" />
          <Typography variant="body2">{job.location}</Typography>
        </InfoItem>
      </CardContent>
    </StyledCard>
  );
};
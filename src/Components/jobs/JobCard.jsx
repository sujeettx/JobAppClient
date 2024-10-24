// JobCard.jsx
import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Divider,
  styled
} from '@mui/material';
import {
  LocationOn,
  WorkHistory,
  AttachMoney,
  CalendarToday,
  BusinessCenter,
  Business
} from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
  position: 'relative',
  overflow: 'visible',
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

const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius: '6px',
  fontWeight: 500,
  '&.deadline': {
    background: theme.palette.error.light,
    color: theme.palette.error.contrastText,
  },
  '&.posted': {
    background: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
}));

const CompanyInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.shape.borderRadius,
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
  },
}));

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const JobCard = ({ job }) => {
  return (
    <StyledCard>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 600 }}>
          {job.title}
        </Typography>

        <CompanyInfo>
          <Business />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              {job.company}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {job.companyIndustry}
            </Typography>
          </Box>
        </CompanyInfo>

        <InfoItem>
          <WorkHistory fontSize="small" />
          <Typography variant="body2">
            {job.experienceLevel} Experience • {job.employmentType}
          </Typography>
        </InfoItem>

        <InfoItem>
          <LocationOn fontSize="small" />
          <Typography variant="body2">
            {job.location} • {job.workplaceType}
          </Typography>
        </InfoItem>

        <InfoItem>
          <AttachMoney fontSize="small" />
          <Typography variant="body2">
            {job.salary} • {job.salaryPeriod}
          </Typography>
        </InfoItem>

        <Divider sx={{ my: 2 }} />

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {job.description.length > 150
            ? `${job.description.substring(0, 150)}...`
            : job.description}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {job.skills?.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              size="small"
              variant="outlined"
              sx={{ borderRadius: '6px' }}
            />
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <StyledChip
            icon={<CalendarToday fontSize="small" />}
            label={`Posted: ${formatDate(job.Postdate)}`}
            size="small"
            className="posted"
          />
          <StyledChip
            icon={<BusinessCenter fontSize="small" />}
            label={`Deadline: ${formatDate(job.DeadlineDate)}`}
            size="small"
            className="deadline"
          />
        </Box>
      </CardContent>

      <CardActions sx={{ p: 3, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            background: 'linear-gradient(45deg, #2563eb, #3b82f6)',
            textTransform: 'none',
            py: 1,
            fontWeight: 600,
            '&:hover': {
              background: 'linear-gradient(45deg, #1d4ed8, #2563eb)',
            },
          }}
          onClick={() => console.log(`Applying for job: ${job._id}`)}
        >
          Apply Now
        </Button>
      </CardActions>
    </StyledCard>
  );
};

// FindJobs.jsx remains the same as in the previous version
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './Components/Header';
import Footer from './Components/Fotter';
import HomePage from './Components/HomePage';
import Auth from './Components/AuthPage';
import NotFoundPage from './Components/NotFound';
import Dashboard from './Components/DashBoard';
import UpdateProfileForm from './Components/UpdateProfile';
import PostJob from './Components/PostJob';
import FindJobs from './Components/FindJobs';
import JobList from './Components/JobList';
import EditJob from './Components/EditJob';

const App = () => {
  return (
    <Router>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: 'white',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<Auth />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/view-jobs" element={<FindJobs />} />
            <Route path="/job-list" element={<JobList />} />
            <Route path="/update-profile" element={<UpdateProfileForm />} />
            <Route path="/edit-job/:jobId" element={<EditJob />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </Box>
    </Router>
  );
};

export default App;

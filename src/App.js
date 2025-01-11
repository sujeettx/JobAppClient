import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './Components/Header';
import Footer from './Components/Fotter';
import HomePage from './Components/HomePage';
import CompanySignup from './Components/SignforComapany';
import StudentSignup from './Components/SignupForStudent';
import Login from './Components/Login';
import NotFoundPage from './Components/NotFound';
import Dashboard from './Components/DashBoard';
import UpdateProfileForm from './Components/UpdateProfile';
import PostJob from './Components/PostJob';
import FindJobs from './Components/FindJobs';
import JobList from './Components/JobList';
import EditJob from './Components/EditJob';
import Applicent from './Components/Applicent';

// Protected Route wrapper component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const authToken = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole');
  
  if (!authToken) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

// Public Route wrapper component
const PublicRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken');
  
  if (authToken) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

const App = () => {
  return (
    <Router>
       <Header />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'white',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <HomePage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup-company"
            element={
              <PublicRoute>
                <CompanySignup/>
              </PublicRoute>
            }
          />
           <Route
            path="/signup-student"
            element={
              <PublicRoute>
               <StudentSignup/>
              </PublicRoute>
            }
          />

          {/* Protected routes for both roles */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-profile"
            element={
              <ProtectedRoute>
                <UpdateProfileForm />
              </ProtectedRoute>
            }
          />

          {/* Company-only routes */}
          <Route
            path="/post-job"
            element={
              <ProtectedRoute allowedRoles={['company']}>
                <PostJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/job-list"
            element={
              <ProtectedRoute allowedRoles={['company']}>
                <JobList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-job/:jobId"
            element={
              <ProtectedRoute allowedRoles={['company']}>
                <EditJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applicants"
            element={
              <ProtectedRoute allowedRoles={['company']}>
                <Applicent />
              </ProtectedRoute>
            }
          />

          {/* Student-only routes */}
          <Route
            path="/view-jobs"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <FindJobs />
              </ProtectedRoute>
            }
          />

          {/* 404 route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Box>
    </Router>
  );
};

export default App;


// import React from 'react'
// import LoginForm from './Components/Login';
// // import SignUpForm from './Components/SignforComapany'
// // import SignUpForm from './Components/SignupForStudent'

// function App() {
//   return (
//     <div>
//       <LoginForm></LoginForm>
//       {/* <SignUpForm></SignUpForm> */}
//     </div>
//   )
// }

// export default App

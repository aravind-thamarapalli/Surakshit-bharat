import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './components/HomePage/HomePage';
import { LearningModules } from './components/LearningModules/LearningModules';
import { TeacherDashboard } from './components/Teacher/TeacherDashboard';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { StudentPortal } from './components/Student/StudentPortal';
import { CommunityHub } from './components/Community/CommunityHub';
import { DrillScheduler } from './components/Emergency/DrillScheduler';
import { ResourceLibrary } from './components/Resources/ResourceLibrary';
import { LandingPage } from './components/Landing/LandingPage';
import { AuthCallback } from './components/Auth/AuthCallback';
import { ProfileSetup } from './components/Auth/ProfileSetup';
import { ProfilePage } from './components/Auth/ProfilePage';
import { ProtectedRoute, RoleRoute } from './components/Auth/ProtectedRoute';
import ErrorBoundary from './components/Common/ErrorBoundary';
import RouteTest from './components/Common/RouteTest';
import LayoutTest from './components/Test/LayoutTest';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/profile/setup" element={<ProfileSetup />} />
          
          {/* Direct portal access for testing (no authentication) */}
          <Route path="/teacher-dashboard" element={
            <Layout>
              <TeacherDashboard />
            </Layout>
          } />
          
          <Route path="/admin-dashboard" element={
            <Layout>
              <AdminDashboard />
            </Layout>
          } />
          
          {/* Debug Route - Public for testing */}
          <Route path="/debug" element={<RouteTest />} />
          <Route path="/layout-test" element={
            <Layout>
              <LayoutTest />
            </Layout>
          } />
          
          {/* Protected dashboard route - Made unprotected for testing */}
          <Route path="/dashboard" element={
            <Layout>
              <HomePage />
            </Layout>
          } />
          
          {/* Student routes - Allow all authenticated users to access */}
          <Route path="/student" element={
            <ProtectedRoute>
              <Layout>
                <StudentPortal />
              </Layout>
            </ProtectedRoute>
          } />
          
          {/* Teacher routes */}
          <Route path="/teacher" element={
            <RoleRoute allowedRoles={['teacher', 'admin']}>
              <Layout>
                <TeacherDashboard />
              </Layout>
            </RoleRoute>
          } />
          
          {/* Admin routes */}
          <Route path="/admin" element={
            <RoleRoute allowedRoles={['admin']}>
              <Layout>
                <AdminDashboard />
              </Layout>
            </RoleRoute>
          } />
          
          {/* Shared protected routes */}
          <Route path="/modules" element={
            <ProtectedRoute>
              <Layout>
                <LearningModules />
              </Layout>
            </ProtectedRoute>
          } />
          
          {/* Sub-routes for modules */}
          <Route path="/modules/*" element={
            <ProtectedRoute>
              <Layout>
                <LearningModules />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/community" element={
            <ProtectedRoute>
              <Layout>
                <CommunityHub />
              </Layout>
            </ProtectedRoute>
          } />
          
          {/* Sub-routes for community */}
          <Route path="/community/*" element={
            <ProtectedRoute>
              <Layout>
                <CommunityHub />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/drills" element={
            <ProtectedRoute>
              <Layout>
                <DrillScheduler />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/resources" element={
            <ProtectedRoute>
              <Layout>
                <ResourceLibrary />
              </Layout>
            </ProtectedRoute>
          } />
          
          {/* Sub-routes for resources */}
          <Route path="/resources/*" element={
            <ProtectedRoute>
              <Layout>
                <ResourceLibrary />
              </Layout>
            </ProtectedRoute>
          } />
          
          {/* Sub-routes for teacher dashboard */}
          <Route path="/teacher/*" element={
            <RoleRoute allowedRoles={['teacher', 'admin']}>
              <Layout>
                <TeacherDashboard />
              </Layout>
            </RoleRoute>
          } />
          
          {/* Sub-routes for admin dashboard */}
          <Route path="/admin/*" element={
            <RoleRoute allowedRoles={['admin']}>
              <Layout>
                <AdminDashboard />
              </Layout>
            </RoleRoute>
          } />
          
          {/* Route Test - Remove in production */}
          <Route path="/route-test" element={
            <Layout>
              <RouteTest />
            </Layout>
          } />
          
          {/* Profile route */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <Layout>
                <ProfilePage />
              </Layout>
            </ProtectedRoute>
          } />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
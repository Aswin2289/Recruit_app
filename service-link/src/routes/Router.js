import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFoundPage from "../pages/not-found-page";
import DashboardPage from "../pages/dashboard-page";
import useAuth from "../hooks/use-auth";
import AuthGuard from "./auth-guard";
import LoginPage from "../pages/login-page";
import RegistrationPage from "../pages/registration-page";
import ViewCompanyProfilePage from "../pages/view-company-profile-page";
import CreatePostPage from "../pages/create-post-page";
import ViewCompanyWisePostPage from "../pages/view-company-wise-post-page";
import JobDetailPage from "../pages/job-detail-page";
import EmployeeDashboardPage from "../pages/JobSeeker/employee-dashboard-page";
import ViewAllJobPostPage from "../pages/JobSeeker/view-all-job-post-page";
import EmployeeDetailViewPage from "../pages/JobSeeker/employee-detail-view-page";
import ChangePasswordPage from "../pages/change-password-page";
import EmployeeProfilePage from "../pages/employee-profile-page";
// import other components as needed

function AppRouter() {
  const { isAuthenticated, getUserDetails } = useAuth();
  const authenticated = isAuthenticated();
  const { role } = getUserDetails();

  const handleNavigateToDashboard = () => {
    if (authenticated) {
      if (role === 2) {
        return <Navigate to="/dashboard" />;
      } else if (role === 3) {
        return <Navigate to="/dashboardEmployee" />;
      } else if (role === 1) {
        return <Navigate to="/dashboard" />;
      } else if (role === 4) {
        return <Navigate to="/dashboard" />;
      } else {
        return <Navigate to="/login" />;
      }
    }
    return <Navigate to="/login" />;
  };
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={handleNavigateToDashboard()} />
      <Route path="/register" element={<RegistrationPage />} />

      <Route
        path="/dashboard"
        element={
          <AuthGuard
            element={<DashboardPage />}
            allowedRoles={[1, 2, 3, 4, 5, 6]}
          />
        }
      />

      <Route
        path="/viewCompanyProfile"
        element={
          <AuthGuard
            element={<ViewCompanyProfilePage />}
            allowedRoles={[1, 2, 3, 4, 5, 6]}
          />
        }
      />
      <Route
        path="/createpost"
        element={
          <AuthGuard
            element={<CreatePostPage />}
            allowedRoles={[1, 2, 3, 4, 5, 6]}
          />
        }
      />
      <Route
        path="/viewpost"
        element={
          <AuthGuard
            element={<ViewCompanyWisePostPage />}
            allowedRoles={[1, 2, 3, 4, 5, 6]}
          />
        }
      />
      <Route
        path="/jobdetail/:id"
        element={
          <AuthGuard
            element={<JobDetailPage />}
            allowedRoles={[1, 2, 3, 4, 5, 6]}
          />
        }
      />

      {/* Employeeee Routed _________________________________ */}
      <Route
        path="/dashboardEmployee"
        element={
          <AuthGuard
            element={<EmployeeDashboardPage />}
            allowedRoles={[1, 2, 3, 4, 5, 6]}
          />
        }
      />
      <Route
        path="/viewalljob"
        element={
          <AuthGuard
            element={<ViewAllJobPostPage />}
            allowedRoles={[1, 2, 3, 4, 5, 6]}
          />
        }
      />
      <Route
        path="/detailview/:id"
        element={
          <AuthGuard
            element={<EmployeeDetailViewPage />}
            allowedRoles={[1, 2, 3, 4, 5, 6]}
          />
        }
      />
      <Route
        path="/changepassword"
        element={
          <AuthGuard
            element={<ChangePasswordPage />}
            allowedRoles={[1, 2, 3, 4, 5, 6]}
          />
        }
      />
      <Route
        path="/employeeprofile"
        element={
          <AuthGuard
            element={<EmployeeProfilePage />}
            allowedRoles={[1, 2, 3]}
          />
        }
      />
      <Route path="*" element={<NotFoundPage />} />
      {/* Add other routes here */}
    </Routes>
  );
}

export default AppRouter;

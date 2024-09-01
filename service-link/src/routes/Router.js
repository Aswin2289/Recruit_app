import React from "react";
import { Routes, Route ,Navigate} from "react-router-dom";
import NotFoundPage from "../pages/not-found-page";
import DashboardPage from "../pages/dashboard-page";
import useAuth from "../hooks/use-auth";
import AuthGuard from "./auth-guard";
import LoginPage from "../pages/login-page";
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
        return <Navigate to="/dashboard" />;
      } else if (role === 1) {
        return <Navigate to="/dashboard" />;
      } else if (role === 4) {
        return <Navigate to="/dashboard" />;
      }else if (role === 5) {
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

      <Route
        path="/dashboard"
        element={<AuthGuard element={<DashboardPage />} allowedRoles={[1,2,3,4,5,6]} />}
      />
      <Route path="*" element={<NotFoundPage />} />
      {/* Add other routes here */}
    </Routes>
  );    
}

export default AppRouter;

import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import OfficialDashboard from "./pages/OfficialDashboard";
import ReportIssuePage from "./pages/ReportIssuePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import ViewIssues from "./pages/ViewIssues";
import IssueDetail from "./pages/IssueDetail";
import AdminCharts from "./pages/AdminCharts";
import NotFound from "./pages/NotFound";
import AccessDenied from "./pages/AccessDenied";
import api from "./api/axiosClient";

export default function App() {

  // Wake up the Render backend as soon as the frontend loads.
  // This helps reduce the wait when the user later tries to log in.
  useEffect(() => {
    const warmUpBackend = async () => {
      try {
        await api.get("/actuator/health");
        console.log("Backend is ready");
      } catch (error) {
        console.warn("Backend warm-up request failed:", error.message);
      }
    };

    warmUpBackend();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/official"
          element={
            <ProtectedRoute roles={["OFFICIAL"]}>
              <OfficialDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <ReportIssuePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/issues"
          element={
            <ProtectedRoute>
              <ViewIssues />
            </ProtectedRoute>
          }
        />

        <Route
          path="/issues/:id"
          element={
            <ProtectedRoute>
              <IssueDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/charts"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminCharts />
            </ProtectedRoute>
          }
        />

        <Route path="/denied" element={<AccessDenied />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

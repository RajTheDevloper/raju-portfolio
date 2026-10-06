import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/public/HomePage";
import ProjectDetailPage from "../pages/public/ProjectDetailPage";

function AdminLoginPage() {
  return <h1>Admin Login</h1>;
}

function AdminDashboardPage() {
  return <h1>Admin Dashboard</h1>;
}

<Route
    path="/projects/:slug"
    element={<ProjectDetailPage />}
/>

function NotFoundPage() {
  return <h1>404 - Page Not Found</h1>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;

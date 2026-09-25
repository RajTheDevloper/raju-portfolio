import { Routes, Route } from "react-router-dom";

function HomePage() {
    return <h1>Home Page</h1>;
}

function ProjectsPage() {
    return <h1>Projects Page</h1>;
}

function ContactPage() {
    return <h1>Contact Page</h1>;
}

function AdminLoginPage() {
    return <h1>Admin Login</h1>;
}

function AdminDashboardPage() {
    return <h1>Admin Dashboard</h1>;
}

function NotFoundPage() {
    return <h1>404 - Page Not Found</h1>;
}

function AppRoutes() {
    return (
        <Routes>

            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Admin routes */}
            <Route
                path="/admin/login"
                element={<AdminLoginPage />}
            />

            <Route
                path="/admin"
                element={<AdminDashboardPage />}
            />

            {/* 404 */}
            <Route
                path="*"
                element={<NotFoundPage />}
            />

        </Routes>
    );
}

export default AppRoutes;

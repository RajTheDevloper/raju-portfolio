import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/public/HomePage";
import ProjectDetailPage from "../pages/public/ProjectDetailPage";

import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";


function NotFoundPage() {

    return (
        <main>
            <h1>404 - Page Not Found</h1>
        </main>
    );
}


function AppRoutes() {

    return (
        <Routes>

            {/* =========================
                PUBLIC ROUTES
            ========================== */}

            <Route
                path="/"
                element={<HomePage />}
            />

            <Route
                path="/projects/:slug"
                element={<ProjectDetailPage />}
            />


            {/* =========================
                ADMIN ROUTES
            ========================== */}

            <Route
                path="/admin/login"
                element={<AdminLoginPage />}
            />

            <Route
                path="/admin"
                element={<AdminDashboardPage />}
            />


            {/* =========================
                404
            ========================== */}

            <Route
                path="*"
                element={<NotFoundPage />}
            />

        </Routes>
    );
}


export default AppRoutes;
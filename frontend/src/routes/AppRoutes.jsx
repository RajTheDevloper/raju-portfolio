import {
    // BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import PortfolioLayout from "../components/layout/PortfolioLayout";

import HomePage from "../pages/public/HomePage";
import ProjectDetailPage from "../pages/public/ProjectDetailPage";

import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";

import AdminLayout from "../components/admin/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
    return (
        // <BrowserRouter>

            <Routes>

                {/* =========================
                    PUBLIC ROUTES
                   ========================= */}

                <Route element={<PortfolioLayout />}>

                    <Route
                        path="/"
                        element={<HomePage />}
                    />

                    <Route
                        path="/projects/:slug"
                        element={<ProjectDetailPage />}
                    />

                </Route>


                {/* =========================
                    ADMIN LOGIN
                   ========================= */}

                <Route
                    path="/admin/login"
                    element={<AdminLoginPage />}
                />


                {/* =========================
                    PROTECTED ADMIN ROUTES
                   ========================= */}

                <Route element={<ProtectedRoute />}>

                    <Route
                        path="/admin"
                        element={<AdminLayout />}
                    >

                        <Route
                            index
                            element={<AdminDashboardPage />}
                        />

                    </Route>

                </Route>

            </Routes>

        // </BrowserRouter>
    );
};

export default AppRoutes;
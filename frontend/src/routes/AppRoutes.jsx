import {
    // BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import AdminProfilePage
    from "../pages/admin/AdminProfilePage";

import PortfolioLayout from "../components/layout/PortfolioLayout";

import HomePage from "../pages/public/HomePage";
import ProjectDetailPage from "../pages/public/ProjectDetailPage";

import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";

import AdminLayout from "../components/admin/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

import AdminProjectsPage from "../pages/admin/AdminProjectsPage";

import AdminTechnologiesPage from "../pages/admin/AdminTechnologiesPage";

import AdminExperiencePage from "../pages/admin/AdminExperiencePage";

import AdminSkillsPage from "../pages/admin/AdminSkillsPage";

import AdminEducationPage from "../pages/admin/AdminEducationPage";

import AdminResumePage from "../pages/admin/AdminResumePage";

import AdminMessagesPage from "../pages/admin/AdminMessagesPage";

import AdminSettingsPage from "../pages/admin/AdminSettingsPage";

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

                    <Route
                        path="profile"
                        element={<AdminProfilePage />}
                    />

                    <Route
                        path="projects"
                        element={<AdminProjectsPage />}
                    />

                    <Route
                        path="technologies"
                        element={<AdminTechnologiesPage />}
                    />


                    <Route
                        path="experience"
                        element={<AdminExperiencePage />}
                    />

                    <Route
                        path="skills"
                        element={<AdminSkillsPage />}
                    />

                    <Route
                        path="education"
                        element={<AdminEducationPage />}
                    />

                    <Route
                        path="resume"
                        element={<AdminResumePage />}
                    />

                    <Route
                        path="messages"
                        element={<AdminMessagesPage />}
                    />

                    <Route
                        path="settings"
                        element={<AdminSettingsPage />}
                    />

                </Route>

            </Route>

        </Routes>

        // </BrowserRouter>
    );
};

export default AppRoutes;
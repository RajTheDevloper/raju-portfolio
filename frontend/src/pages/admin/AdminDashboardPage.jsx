import { useEffect, useState } from "react";

import {
    FolderKanban,
    BriefcaseBusiness,
    GraduationCap,
    Code2,
    MessageSquare,
    FileText,
    RefreshCw
} from "lucide-react";

import { getAdminDashboard } from "../../services/admin/dashboardService";

const AdminDashboardPage = () => {
    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const loadDashboard = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getAdminDashboard();

            setDashboard(data);
        } catch (err) {
            console.error(
                "Failed to load admin dashboard:",
                err
            );

            setError(
                err?.response?.data?.message ||
                "Failed to load dashboard data."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    const stats = [
        {
            label: "Projects",
            value: dashboard?.totalProjects ?? 0,
            icon: FolderKanban
        },
        {
            label: "Experience",
            value: dashboard?.totalExperience ?? 0,
            icon: BriefcaseBusiness
        },
        {
            label: "Education",
            value: dashboard?.totalEducation ?? 0,
            icon: GraduationCap
        },
        {
            label: "Skills",
            value: dashboard?.totalSkills ?? 0,
            icon: Code2
        },
        {
            label: "Messages",
            value: dashboard?.totalMessages ?? 0,
            icon: MessageSquare
        },
        {
            label: "Active Resume",
            value: dashboard?.activeResume ? "Yes" : "No",
            icon: FileText
        }
    ];

    if (loading) {
        return (
            <div className="admin-page-state">
                <div className="admin-loading-spinner" />

                <p>
                    Loading dashboard...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-page-state admin-error-state">

                <h2>
                    Unable to load dashboard
                </h2>

                <p>
                    {error}
                </p>

                <button
                    type="button"
                    onClick={loadDashboard}
                    className="admin-retry-button"
                >
                    <RefreshCw size={17} />
                    Try Again
                </button>

            </div>
        );
    }

    return (
        <div className="admin-dashboard">

            {/* =========================
                PAGE HEADER
               ========================= */}

            <div className="admin-page-heading">

                <div>
                    <h2>
                        Dashboard
                    </h2>

                    <p>
                        Welcome back. Manage your portfolio
                        from one place.
                    </p>
                </div>

                <button
                    type="button"
                    className="admin-refresh-button"
                    onClick={loadDashboard}
                    title="Refresh dashboard"
                >
                    <RefreshCw size={17} />
                    Refresh
                </button>

            </div>


            {/* =========================
                MAIN STATISTICS
               ========================= */}

            <div className="admin-stats-grid">

                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            className="admin-stat-card"
                            key={stat.label}
                        >

                            <div className="admin-stat-icon">
                                <Icon size={22} />
                            </div>

                            <div>

                                <span>
                                    {stat.label}
                                </span>

                                <strong>
                                    {stat.value}
                                </strong>

                            </div>

                        </div>
                    );
                })}

            </div>


            {/* =========================
                PROJECT STATUS
               ========================= */}

            <div className="admin-dashboard-grid">

                <div className="admin-dashboard-card">

                    <div className="admin-card-header">

                        <div>
                            <h3>
                                Project Status
                            </h3>

                            <p>
                                Current project publishing status
                            </p>
                        </div>

                    </div>

                    <div className="admin-status-list">

                        <div className="admin-status-item">
                            <span>
                                Published
                            </span>

                            <strong>
                                {dashboard?.publishedProjects ?? 0}
                            </strong>
                        </div>

                        <div className="admin-status-item">
                            <span>
                                Draft
                            </span>

                            <strong>
                                {dashboard?.draftProjects ?? 0}
                            </strong>
                        </div>

                        <div className="admin-status-item">
                            <span>
                                Archived
                            </span>

                            <strong>
                                {dashboard?.archivedProjects ?? 0}
                            </strong>
                        </div>

                    </div>

                </div>


                {/* =========================
                    MESSAGE STATUS
                   ========================= */}

                <div className="admin-dashboard-card">

                    <div className="admin-card-header">

                        <div>
                            <h3>
                                Messages
                            </h3>

                            <p>
                                Contact message overview
                            </p>
                        </div>

                    </div>

                    <div className="admin-status-list">

                        <div className="admin-status-item">
                            <span>
                                Total
                            </span>

                            <strong>
                                {dashboard?.totalMessages ?? 0}
                            </strong>
                        </div>

                        <div className="admin-status-item">
                            <span>
                                Unread
                            </span>

                            <strong>
                                {dashboard?.unreadMessages ?? 0}
                            </strong>
                        </div>

                        <div className="admin-status-item">
                            <span>
                                Read
                            </span>

                            <strong>
                                {dashboard?.readMessages ?? 0}
                            </strong>
                        </div>

                        <div className="admin-status-item">
                            <span>
                                Archived
                            </span>

                            <strong>
                                {dashboard?.archivedMessages ?? 0}
                            </strong>
                        </div>

                    </div>

                </div>

            </div>


            {/* =========================
                RECENT REVISIONS
               ========================= */}

            <div className="admin-dashboard-card admin-revisions-card">

                <div className="admin-card-header">

                    <div>
                        <h3>
                            Recent Revisions
                        </h3>

                        <p>
                            Recently created content versions
                        </p>
                    </div>

                </div>

                {dashboard?.recentRevisions?.length > 0 ? (

                    <div className="admin-revisions-list">

                        {dashboard.recentRevisions.map(
                            (revision, index) => (
                                <div
                                    className="admin-revision-item"
                                    key={
                                        revision.id ??
                                        `${revision.contentType}-${index}`
                                    }
                                >

                                    <div>
                                        <strong>
                                            {revision.contentType ||
                                                "Content"}
                                        </strong>

                                        <span>
                                            Version{" "}
                                            {revision.versionNumber ??
                                                "—"}
                                        </span>
                                    </div>

                                    <span className="admin-revision-status">
                                        {revision.status ||
                                            "UNKNOWN"}
                                    </span>

                                </div>
                            )
                        )}

                    </div>

                ) : (

                    <div className="admin-empty-state">
                        <p>
                            No recent revisions found.
                        </p>
                    </div>

                )}

            </div>

        </div>
    );
};

export default AdminDashboardPage;
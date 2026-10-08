import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    User,
    FolderKanban,
    BriefcaseBusiness,
    GraduationCap,
    Code2,
    FileText,
    MessageSquare,
    Settings,
    LogOut
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/admin/login", { replace: true });
    };

    const navItems = [
        {
            label: "Dashboard",
            path: "/admin",
            icon: LayoutDashboard,
            end: true
        },
        {
            label: "Profile",
            path: "/admin/profile",
            icon: User
        },
        {
            label: "Projects",
            path: "/admin/projects",
            icon: FolderKanban
        },
        {
            label: "Experience",
            path: "/admin/experience",
            icon: BriefcaseBusiness
        },
        {
            label: "Education",
            path: "/admin/education",
            icon: GraduationCap
        },
        {
            label: "Skills",
            path: "/admin/skills",
            icon: Code2
        },
        {
            label: "Resume",
            path: "/admin/resume",
            icon: FileText
        },
        {
            label: "Messages",
            path: "/admin/messages",
            icon: MessageSquare
        },
        {
            label: "Settings",
            path: "/admin/settings",
            icon: Settings
        }
    ];

    return (
        <div className="admin-layout">

            <aside className="admin-sidebar">

                <div className="admin-sidebar-header">
                    <div className="admin-logo">
                        RB
                    </div>

                    <div>
                        <h2>Portfolio CMS</h2>
                        <span>Admin Panel</span>
                    </div>
                </div>

                <nav className="admin-navigation">

                    {navItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.end}
                                className={({ isActive }) =>
                                    `admin-nav-link ${
                                        isActive ? "active" : ""
                                    }`
                                }
                            >
                                <Icon size={19} />

                                <span>
                                    {item.label}
                                </span>
                            </NavLink>
                        );
                    })}

                </nav>

                <div className="admin-sidebar-footer">

                    <div className="admin-user-card">

                        <div className="admin-user-avatar">
                            {(user?.username || "A")
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        <div className="admin-user-info">
                            <strong>
                                {user?.username || "Admin"}
                            </strong>

                            <span>
                                {user?.role || "Administrator"}
                            </span>
                        </div>

                    </div>

                    <button
                        type="button"
                        className="admin-logout-button"
                        onClick={handleLogout}
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>

                </div>

            </aside>

            <main className="admin-main">

                <header className="admin-topbar">

                    <div>
                        <h1>Admin Panel</h1>
                        <p>
                            Manage your portfolio content
                        </p>
                    </div>

                    <a
                        href="/"
                        target="_blank"
                        rel="noreferrer"
                        className="admin-view-site"
                    >
                        View Website
                    </a>

                </header>

                <section className="admin-content">
                    <Outlet />
                </section>

            </main>

        </div>
    );
};

export default AdminLayout;
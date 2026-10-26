
import { useCallback, useEffect, useState } from "react";
import {
    Archive,
    Edit,
    Plus,
    RefreshCw,
    Search,
    Upload
} from "lucide-react";

import {
    archiveAdminProject,
    createAdminProject,
    getAdminProjects,
    publishAdminProject,
    unpublishAdminProject,
    updateAdminProject
} from "../../services/admin/projectService";

import ProjectForm from "../../components/admin/projects/ProjectForm";
import RevisionHistory from "../../components/admin/RevisionHistory";
import ProjectDraftPreview from "../../components/admin/ProjectDraftPreview";
import ConfirmDialog from "../../components/common/ConfirmDialog";

const normalizeProjects = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.content)) return data.content;
    if (Array.isArray(data?.projects)) return data.projects;

    return [];
};

const ACTION_DETAILS = {
    publish: {
        title: "Publish project?",
        confirmText: "Publish Project",
        message: (name) =>
            `Are you sure you want to publish "${name}"? It may become visible on your public portfolio.`,
        success: "published successfully."
    },
    unpublish: {
        title: "Unpublish project?",
        confirmText: "Unpublish Project",
        message: (name) =>
            `Are you sure you want to unpublish "${name}"? It will no longer appear as a published project.`,
        success: "unpublished successfully."
    },
    archive: {
        title: "Archive project?",
        confirmText: "Archive Project",
        message: (name) =>
            `Are you sure you want to archive "${name}"?`,
        success: "archived successfully."
    }
};

const getErrorMessage = (err, fallback) => {
    const responseData = err?.response?.data;

    if (typeof responseData?.message === "string") {
        return responseData.message;
    }

    if (typeof responseData?.detail === "string") {
        return responseData.detail;
    }

    if (typeof responseData === "string" && responseData.trim()) {
        return responseData;
    }

    return fallback;
};

const AdminProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    const [revisionProject, setRevisionProject] = useState(null);
    const [previewProject, setPreviewProject] = useState(null);

    // Holds the project and action currently awaiting confirmation.
    const [pendingAction, setPendingAction] = useState(null);

    const loadProjects = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getAdminProjects();
            setProjects(normalizeProjects(data));
        } catch (err) {
            console.error("Failed to load projects:", err);

            setError(
                getErrorMessage(
                    err,
                    "Unable to load projects. Please check your connection and try again."
                )
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProjects();
    }, [loadProjects]);

    const visibleProjects = projects.filter((project) => {
        const term = search.trim().toLowerCase();

        const matchesSearch =
            !term ||
            (project.name || "").toLowerCase().includes(term) ||
            (project.slug || "").toLowerCase().includes(term);

        const status = String(project.status || "").toUpperCase();

        const matchesStatus =
            statusFilter === "ALL" ||
            status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const openCreateForm = () => {
        setEditingProject(null);
        setShowForm(true);
        setError("");
        setSuccess("");
    };

    const openEditForm = (project) => {
        setEditingProject(project);
        setShowForm(true);
        setError("");
        setSuccess("");
    };

    const closeForm = () => {
        if (saving) return;

        setShowForm(false);
        setEditingProject(null);
    };

    const handleSave = async (projectData) => {
        try {
            setSaving(true);
            setError("");
            setSuccess("");

            if (editingProject) {
                await updateAdminProject(
                    editingProject.id,
                    projectData
                );

                setSuccess("Project updated successfully.");
            } else {
                await createAdminProject(projectData);

                setSuccess("Project created successfully.");
            }

            setShowForm(false);
            setEditingProject(null);

            await loadProjects();
        } catch (err) {
            console.error("Failed to save project:", err);

            setError(
                getErrorMessage(
                    err,
                    "Unable to save the project. Please try again."
                )
            );
        } finally {
            setSaving(false);
        }
    };

    // Open the confirmation dialog without calling the backend yet.
    const requestAction = (project, action) => {
        setError("");
        setSuccess("");

        setPendingAction({
            project,
            action
        });
    };

    // Called only after the user confirms the action.
    const confirmAction = async () => {
        if (!pendingAction || actionLoading) return;

        const { project, action } = pendingAction;
        const actionDetails = ACTION_DETAILS[action];

        try {
            setActionLoading(true);
            setError("");
            setSuccess("");

            if (action === "publish") {
                await publishAdminProject(project.id);
            } else if (action === "unpublish") {
                await unpublishAdminProject(project.id);
            } else if (action === "archive") {
                await archiveAdminProject(project.id);
            } else {
                throw new Error("Unsupported project action.");
            }

            setPendingAction(null);
            setSuccess(
                `"${project.name}" ${actionDetails.success}`
            );

            // Refresh the table to show the latest project status.
            await loadProjects();
        } catch (err) {
            console.error(
                `Failed to ${action} project:`,
                err
            );

            setError(
                getErrorMessage(
                    err,
                    `Unable to ${action} the project. Please try again.`
                )
            );
        } finally {
            setActionLoading(false);
        }
    };

    const cancelAction = () => {
        if (actionLoading) return;

        setPendingAction(null);
    };

    return (
        <div className="admin-projects-page">
            <div className="admin-page-heading">
                <div>
                    <h2>Projects</h2>
                    <p>
                        Create, edit, and manage your portfolio projects.
                    </p>
                </div>

                <button
                    type="button"
                    className="admin-save-button"
                    onClick={openCreateForm}
                    disabled={saving || actionLoading}
                >
                    <Plus size={18} />
                    New Project
                </button>
            </div>

            {error && (
                <div
                    className="admin-alert admin-alert-error"
                    role="alert"
                >
                    {error}
                </div>
            )}

            {success && (
                <div
                    className="admin-alert admin-alert-success"
                    role="status"
                >
                    {success}
                </div>
            )}

            {showForm && (
                <div className="admin-project-form-wrapper">
                    <ProjectForm
                        project={editingProject}
                        onSubmit={handleSave}
                        onCancel={closeForm}
                        saving={saving}
                    />
                </div>
            )}

            <div className="admin-project-toolbar">
                <div className="admin-project-search">
                    <Search size={18} />

                    <input
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search projects..."
                        aria-label="Search projects"
                    />
                </div>

                <select
                    value={statusFilter}
                    onChange={(event) =>
                        setStatusFilter(event.target.value)
                    }
                    aria-label="Filter by project status"
                >
                    <option value="ALL">All statuses</option>
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="ARCHIVED">Archived</option>
                </select>

                <button
                    type="button"
                    className="admin-refresh-button"
                    onClick={loadProjects}
                    disabled={loading || actionLoading}
                >
                    <RefreshCw
                        size={16}
                        className={loading ? "spinning" : ""}
                    />
                    {loading ? "Refreshing..." : "Refresh"}
                </button>
            </div>

            {loading ? (
                <div className="admin-page-state">
                    <div className="admin-loading-spinner" />
                    <p>Loading projects...</p>
                </div>
            ) : visibleProjects.length === 0 ? (
                <div className="admin-dashboard-card admin-project-empty">
                    <h3>No projects found</h3>
                    <p>
                        Try another search or create a new project.
                    </p>
                </div>
            ) : (
                <div className="admin-project-table-wrapper">
                    <table className="admin-project-table">
                        <thead>
                            <tr>
                                <th>Project</th>
                                <th>Status</th>
                                <th>Featured</th>
                                <th>Technologies</th>
                                <th>Actions</th>
                                <th>Revision History</th>
                                <th>Preview</th>
                            </tr>
                        </thead>

                        <tbody>
                            {visibleProjects.map((project) => {
                                const status = String(
                                    project.status || "UNKNOWN"
                                ).toUpperCase();

                                const projectActionInProgress =
                                    actionLoading &&
                                    pendingAction?.project.id === project.id;

                                const actionsDisabled =
                                    actionLoading || saving;

                                return (
                                    <tr key={project.id}>
                                        <td>
                                            <strong>
                                                {project.name || "Untitled"}
                                            </strong>

                                            <span className="admin-project-slug">
                                                /{project.slug}
                                            </span>
                                        </td>

                                        <td>
                                            <span
                                                className={`admin-project-status status-${status.toLowerCase()}`}
                                            >
                                                {status}
                                            </span>
                                        </td>

                                        <td>
                                            {project.featured ? "Yes" : "No"}
                                        </td>

                                        <td>
                                            <div className="admin-project-techs">
                                                {(project.technologies || [])
                                                    .slice(0, 3)
                                                    .map((technology) => {
                                                        const name =
                                                            typeof technology === "string"
                                                                ? technology
                                                                : technology.name;

                                                        return (
                                                            <span key={name}>
                                                                {name}
                                                            </span>
                                                        );
                                                    })}
                                            </div>
                                        </td>

                                        <td>
                                            <div className="admin-project-actions">
                                                <button
                                                    type="button"
                                                    title="Edit project"
                                                    aria-label={`Edit ${project.name}`}
                                                    onClick={() =>
                                                        openEditForm(project)
                                                    }
                                                    disabled={actionsDisabled}
                                                >
                                                    <Edit size={16} />
                                                </button>

                                                {status === "DRAFT" && (
                                                    <button
                                                        type="button"
                                                        title="Publish project"
                                                        aria-label={`Publish ${project.name}`}
                                                        onClick={() =>
                                                            requestAction(
                                                                project,
                                                                "publish"
                                                            )
                                                        }
                                                        disabled={actionsDisabled}
                                                    >
                                                        {projectActionInProgress &&
                                                        pendingAction?.action === "publish"
                                                            ? "..."
                                                            : <Upload size={16} />}
                                                    </button>
                                                )}

                                                {status === "PUBLISHED" && (
                                                    <button
                                                        type="button"
                                                        title="Unpublish project"
                                                        aria-label={`Unpublish ${project.name}`}
                                                        onClick={() =>
                                                            requestAction(
                                                                project,
                                                                "unpublish"
                                                            )
                                                        }
                                                        disabled={actionsDisabled}
                                                    >
                                                        {projectActionInProgress &&
                                                        pendingAction?.action === "unpublish"
                                                            ? "..."
                                                            : <Archive size={16} />}
                                                    </button>
                                                )}

                                                {status !== "ARCHIVED" && (
                                                    <button
                                                        type="button"
                                                        title="Archive project"
                                                        aria-label={`Archive ${project.name}`}
                                                        onClick={() =>
                                                            requestAction(
                                                                project,
                                                                "archive"
                                                            )
                                                        }
                                                        disabled={actionsDisabled}
                                                    >
                                                        {projectActionInProgress &&
                                                        pendingAction?.action === "archive"
                                                            ? "..."
                                                            : <Archive size={16} />}
                                                    </button>
                                                )}
                                            </div>
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setRevisionProject(project)
                                                }
                                                disabled={actionsDisabled}
                                            >
                                                Revision History
                                            </button>
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setPreviewProject(project)
                                                }
                                                disabled={actionsDisabled}
                                            >
                                                Preview Draft
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {revisionProject && (
                <RevisionHistory
                    project={revisionProject}
                    onClose={() => setRevisionProject(null)}
                />
            )}

            {previewProject && (
                <ProjectDraftPreview
                    project={previewProject}
                    onClose={() => setPreviewProject(null)}
                />
            )}

            {pendingAction && (
                <ConfirmDialog
                    title={ACTION_DETAILS[pendingAction.action].title}
                    message={ACTION_DETAILS[pendingAction.action].message(
                        pendingAction.project.name
                    )}
                    confirmText={
                        ACTION_DETAILS[pendingAction.action].confirmText
                    }
                    cancelText="Cancel"
                    danger={pendingAction.action === "archive"}
                    loading={actionLoading}
                    onConfirm={confirmAction}
                    onCancel={cancelAction}
                />
            )}
        </div>
    );
};

export default AdminProjectsPage;

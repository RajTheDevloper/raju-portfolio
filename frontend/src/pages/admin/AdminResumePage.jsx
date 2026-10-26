import { useCallback, useEffect, useMemo, useState } from "react";
import ResumeForm from "../../components/admin/resume/ResumeForm";
import {
    createResume,
    deleteResume,
    getResumes,
    updateResume,
} from "../../services/admin/resumeService";

const getErrorMessage = (error) =>
    error?.response?.data?.message ||
    error?.response?.data?.detail ||
    (typeof error?.response?.data === "string" ? error.response.data : null) ||
    error?.message ||
    "Something went wrong. Please try again.";

const formatDate = (value) => {
    if (!value) return "—";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "—";

    return date.toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
    });
};

const formatFileSize = (bytes) => {
    if (bytes === null || bytes === undefined || bytes === "") {
        return "Not provided";
    }

    const size = Number(bytes);

    if (!Number.isFinite(size) || size < 0) return "Unknown";
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;

    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

const AdminResumePage = () => {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingResume, setEditingResume] = useState(null);
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const loadResumes = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getResumes();
            setResumes(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadResumes();
    }, [loadResumes]);

    const activeCount = useMemo(
        () => resumes.filter((resume) => resume.active).length,
        [resumes]
    );

    const filteredResumes = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        return resumes.filter((resume) => {
            const matchesSearch =
                !normalizedSearch ||
                [resume.fileName, resume.fileType, resume.uploadedBy]
                    .filter(Boolean)
                    .some((value) =>
                        String(value).toLowerCase().includes(normalizedSearch)
                    );

            const matchesActive =
                activeFilter === "all" ||
                (activeFilter === "active" && resume.active) ||
                (activeFilter === "inactive" && !resume.active);

            return matchesSearch && matchesActive;
        });
    }, [resumes, search, activeFilter]);

    const openCreateForm = () => {
        setEditingResume(null);
        setError("");
        setSuccess("");
        setShowForm(true);
    };

    const openEditForm = (resume) => {
        setEditingResume(resume);
        setError("");
        setSuccess("");
        setShowForm(true);
    };

    const closeForm = () => {
        if (saving) return;

        setShowForm(false);
        setEditingResume(null);
    };

    const handleSubmit = async (resumeData) => {
        setSaving(true);
        setError("");
        setSuccess("");

        try {
            if (editingResume) {
                await updateResume(editingResume.id, resumeData);
                setSuccess("Resume details updated successfully.");
            } else {
                await createResume(resumeData);
                setSuccess("Resume record created successfully.");
            }

            setShowForm(false);
            setEditingResume(null);
            await loadResumes();
        } catch (err) {
            setError(getErrorMessage(err));
            throw err;
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (resume) => {
        const confirmed = window.confirm(
            `Delete "${resume.fileName}"? This action cannot be undone.`
        );

        if (!confirmed) return;

        setError("");
        setSuccess("");

        try {
            await deleteResume(resume.id);
            setSuccess("Resume record deleted successfully.");
            await loadResumes();
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    return (
        <section className="admin-resume-page">
            <header className="resume-page-header">
                <div>
                    <p className="resume-eyebrow">CONTENT MANAGEMENT</p>
                    <h1>Resume Management</h1>
                    <p className="resume-page-description">
                        Manage the resume file records displayed through your portfolio.
                    </p>
                </div>

                {!showForm && (
                    <button
                        type="button"
                        className="resume-button resume-button-primary"
                        onClick={openCreateForm}
                    >
                        <span aria-hidden="true">＋</span> Add resume
                    </button>
                )}
            </header>

            {error && (
                <div className="resume-alert resume-alert-error" role="alert">
                    <span>{error}</span>
                    <button type="button" onClick={() => setError("")} aria-label="Dismiss error">
                        ×
                    </button>
                </div>
            )}

            {success && (
                <div className="resume-alert resume-alert-success" role="status">
                    <span>{success}</span>
                    <button type="button" onClick={() => setSuccess("")} aria-label="Dismiss message">
                        ×
                    </button>
                </div>
            )}

            <div className="resume-stat-grid">
                <article className="resume-stat-card">
                    <span className="resume-stat-label">Total resumes</span>
                    <strong>{resumes.length}</strong>
                    <span className="resume-stat-note">Stored records</span>
                </article>

                <article className="resume-stat-card">
                    <span className="resume-stat-label">Active resume records</span>
                    <strong>{activeCount}</strong>
                    <span className="resume-stat-note">Marked active by the backend</span>
                </article>

                <article className="resume-stat-card">
                    <span className="resume-stat-label">Inactive records</span>
                    <strong>{resumes.length - activeCount}</strong>
                    <span className="resume-stat-note">Not marked active</span>
                </article>
            </div>

            {showForm && (
                <div className="resume-form-panel">
                    <ResumeForm
                        initialData={editingResume}
                        onSubmit={handleSubmit}
                        onCancel={closeForm}
                        saving={saving}
                    />
                </div>
            )}

            <div className="resume-list-panel">
                <div className="resume-list-heading">
                    <div>
                        <h2>Your resumes</h2>
                        <p>Review, update, or remove a resume record.</p>
                    </div>

                    <button
                        type="button"
                        className="resume-button resume-button-secondary"
                        onClick={loadResumes}
                        disabled={loading}
                    >
                        {loading ? "Refreshing..." : "↻ Refresh"}
                    </button>
                </div>

                <div className="resume-toolbar">
                    <div className="resume-search">
                        <span aria-hidden="true">⌕</span>
                        <input
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search file name, type, or uploader..."
                            aria-label="Search resumes"
                        />
                    </div>

                    <select
                        value={activeFilter}
                        onChange={(event) => setActiveFilter(event.target.value)}
                        aria-label="Filter resumes by active status"
                    >
                        <option value="all">All resumes</option>
                        <option value="active">Active only</option>
                        <option value="inactive">Inactive only</option>
                    </select>
                </div>

                {loading ? (
                    <div className="resume-empty-state">
                        <div className="resume-loading-indicator" />
                        <p>Loading resumes...</p>
                    </div>
                ) : filteredResumes.length === 0 ? (
                    <div className="resume-empty-state">
                        <div className="resume-empty-icon" aria-hidden="true">▤</div>
                        <h3>{resumes.length === 0 ? "No resumes yet" : "No matching resumes"}</h3>
                        <p>
                            {resumes.length === 0
                                ? "Add a resume record to get started."
                                : "Try a different search term or filter."}
                        </p>
                        {resumes.length === 0 && (
                            <button
                                type="button"
                                className="resume-button resume-button-primary"
                                onClick={openCreateForm}
                            >
                                Add your first resume
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="resume-table-wrapper">
                        <table className="resume-table">
                            <thead>
                                <tr>
                                    <th>Resume</th>
                                    <th>File details</th>
                                    <th>Status</th>
                                    <th>Uploaded</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredResumes.map((resume) => (
                                    <tr key={resume.id}>
                                        <td>
                                            <div className="resume-file-cell">
                                                <div className="resume-file-icon" aria-hidden="true">
                                                    {(resume.fileType || "FILE")
                                                        .slice(0, 4)
                                                        .toUpperCase()}
                                                </div>
                                                <div>
                                                    <strong>{resume.fileName}</strong>
                                                    <a
                                                        className="resume-open-link"
                                                        href={resume.fileUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Open file ↗
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="resume-detail-primary">
                                                {resume.fileType || "Type not specified"}
                                            </span>
                                            <span className="resume-detail-secondary">
                                                {formatFileSize(resume.fileSize)}
                                            </span>
                                        </td>
                                        <td>
                                            <span
                                                className={`resume-status ${
                                                    resume.active ? "resume-status-active" : "resume-status-inactive"
                                                }`}
                                            >
                                                {resume.active ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="resume-detail-primary">
                                                {formatDate(resume.uploadedAt)}
                                            </span>
                                            <span className="resume-detail-secondary">
                                                {resume.uploadedBy || "Uploader not recorded"}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="resume-row-actions">
                                                <button
                                                    type="button"
                                                    className="resume-action-button"
                                                    onClick={() => openEditForm(resume)}
                                                    aria-label={`Edit ${resume.fileName}`}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="resume-action-button resume-action-danger"
                                                    onClick={() => handleDelete(resume)}
                                                    aria-label={`Delete ${resume.fileName}`}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {!loading && filteredResumes.length > 0 && (
                    <div className="resume-table-footer">
                        Showing {filteredResumes.length} of {resumes.length} resume records
                    </div>
                )}
            </div>
        </section>
    );
};

export default AdminResumePage;
import { useCallback, useEffect, useState } from "react";
import {
    Plus,
    RefreshCw,
    Pencil,
    Trash2,
    BriefcaseBusiness,
    Eye,
    EyeOff,
    Archive,
    X
} from "lucide-react";

import ExperienceForm from "../../components/admin/experience/ExperienceForm";

import {
    getAdminExperiences,
    createExperience,
    updateExperience,
    deleteExperience,
    publishExperience,
    unpublishExperience,
    archiveExperience
} from "../../services/admin/experienceService";

const AdminExperiencePage = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingExperience, setEditingExperience] = useState(null);

    const loadExperiences = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getAdminExperiences();
            setExperiences(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to load experiences:", err);
            setError(
                err?.response?.data?.message ||
                "Unable to load experiences."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadExperiences();
    }, [loadExperiences]);

    const openCreateForm = () => {
        setEditingExperience(null);
        setSuccess("");
        setError("");
        setShowForm(true);
    };

    const openEditForm = (experience) => {
        setEditingExperience(experience);
        setSuccess("");
        setError("");
        setShowForm(true);
    };

    const closeForm = () => {
        if (saving) return;

        setShowForm(false);
        setEditingExperience(null);
    };

    const handleSave = async (formData) => {
        try {
            setSaving(true);
            setError("");
            setSuccess("");

            if (editingExperience) {
                await updateExperience(editingExperience.id, formData);
                setSuccess("Experience updated successfully.");
            } else {
                await createExperience(formData);
                setSuccess("Experience created successfully.");
            }

            setShowForm(false);
            setEditingExperience(null);

            await loadExperiences();
        } catch (err) {
            console.error("Failed to save experience:", err);
            setError(
                err?.response?.data?.message ||
                "Unable to save experience. Please check the fields and try again."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (experience) => {
        const confirmed = window.confirm(
            `Delete the experience at "${experience.companyName}"? This action cannot be undone.`
        );

        if (!confirmed) return;

        try {
            setError("");
            setSuccess("");

            await deleteExperience(experience.id);

            setSuccess("Experience deleted successfully.");
            await loadExperiences();
        } catch (err) {
            console.error("Failed to delete experience:", err);
            setError(
                err?.response?.data?.message ||
                "Unable to delete this experience."
            );
        }
    };

    const handleStatusAction = async (experience, action) => {
        const actionLabels = {
            publish: "publish",
            unpublish: "unpublish",
            archive: "archive"
        };

        const actionFunctions = {
            publish: publishExperience,
            unpublish: unpublishExperience,
            archive: archiveExperience
        };

        const actionFunction = actionFunctions[action];

        if (!actionFunction) return;

        if (action === "archive") {
            const confirmed = window.confirm(
                `Archive the experience at "${experience.companyName}"?`
            );

            if (!confirmed) return;
        }

        try {
            setError("");
            setSuccess("");

            await actionFunction(experience.id);

            setSuccess(
                `Experience ${actionLabels[action]} action completed successfully.`
            );

            await loadExperiences();
        } catch (err) {
            console.error(`Failed to ${action} experience:`, err);
            setError(
                err?.response?.data?.message ||
                `Unable to ${action} this experience.`
            );
        }
    };

    const formatDate = (date) => {
        if (!date) return "";

        const parsed = new Date(`${date}T00:00:00`);

        return Number.isNaN(parsed.getTime())
            ? date
            : parsed.toLocaleDateString("en-IN", {
                month: "short",
                year: "numeric"
            });
    };

    const formatPeriod = (experience) => {
        const start = formatDate(experience.startDate) || "—";
        const end = experience.current
            ? "Present"
            : formatDate(experience.endDate) || "Not specified";

        return `${start} – ${end}`;
    };

    const getStatusClass = (status) =>
        `admin-experience-status status-${String(status || "unknown").toLowerCase()}`;

    return (
        <div className="admin-experience-page">
            <div className="admin-page-heading">
                <div>
                    <h2>Experience</h2>
                    <p>
                        Manage your work history, employment details,
                        and publishing status.
                    </p>
                </div>

                <div className="admin-experience-header-actions">
                    <button
                        type="button"
                        className="admin-refresh-button"
                        onClick={loadExperiences}
                        disabled={loading}
                    >
                        <RefreshCw size={17} />
                        Refresh
                    </button>

                    <button
                        type="button"
                        className="admin-experience-add-button"
                        onClick={openCreateForm}
                    >
                        <Plus size={18} />
                        Add Experience
                    </button>
                </div>
            </div>

            {error && (
                <div className="admin-experience-alert error" role="alert">
                    <span>{error}</span>
                    <button
                        type="button"
                        onClick={() => setError("")}
                        aria-label="Dismiss error"
                    >
                        <X size={17} />
                    </button>
                </div>
            )}

            {success && (
                <div className="admin-experience-alert success" role="status">
                    <span>{success}</span>
                    <button
                        type="button"
                        onClick={() => setSuccess("")}
                        aria-label="Dismiss success message"
                    >
                        <X size={17} />
                    </button>
                </div>
            )}

            {showForm && (
                <ExperienceForm
                    initialData={editingExperience}
                    onSubmit={handleSave}
                    onCancel={closeForm}
                    saving={saving}
                />
            )}

            <div className="admin-experience-list-header">
                <div>
                    <h3>Your Experience</h3>
                    <p>
                        {experiences.length}{" "}
                        {experiences.length === 1 ? "entry" : "entries"}
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="admin-page-state">
                    <div className="admin-loading-spinner" />
                    <p>Loading experience entries...</p>
                </div>
            ) : experiences.length === 0 ? (
                <div className="admin-experience-empty">
                    <BriefcaseBusiness size={34} />
                    <h3>No experience entries yet</h3>
                    <p>
                        Add your first role to start building your
                        professional timeline.
                    </p>
                    <button
                        type="button"
                        className="admin-experience-add-button"
                        onClick={openCreateForm}
                    >
                        <Plus size={18} />
                        Add Your First Experience
                    </button>
                </div>
            ) : (
                <div className="admin-experience-list">
                    {experiences.map((experience) => {
                        const status = String(
                            experience.status || "UNKNOWN"
                        ).toUpperCase();

                        return (
                            <article
                                className="admin-experience-card"
                                key={experience.id}
                            >
                                <div className="admin-experience-card-top">
                                    <div className="admin-experience-company-icon">
                                        <BriefcaseBusiness size={22} />
                                    </div>

                                    <div className="admin-experience-card-title">
                                        <h3>{experience.jobTitle}</h3>
                                        <p>
                                            {experience.companyName}
                                            {experience.location
                                                ? ` · ${experience.location}`
                                                : ""}
                                        </p>
                                    </div>

                                    <span className={getStatusClass(status)}>
                                        {status}
                                    </span>
                                </div>

                                <div className="admin-experience-meta">
                                    <span>{formatPeriod(experience)}</span>

                                    {experience.employmentType && (
                                        <span>
                                            {experience.employmentType}
                                        </span>
                                    )}

                                    <span>
                                        Display order:{" "}
                                        {experience.displayOrder ?? 0}
                                    </span>
                                </div>

                                {experience.description && (
                                    <p className="admin-experience-description">
                                        {experience.description}
                                    </p>
                                )}

                                {experience.responsibilities && (
                                    <div className="admin-experience-responsibilities">
                                        <strong>Responsibilities</strong>
                                        <p>{experience.responsibilities}</p>
                                    </div>
                                )}

                                <div className="admin-experience-card-actions">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            openEditForm(experience)
                                        }
                                        disabled={saving}
                                    >
                                        <Pencil size={15} />
                                        Edit
                                    </button>

                                    {status === "PUBLISHED" ? (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleStatusAction(
                                                    experience,
                                                    "unpublish"
                                                )
                                            }
                                            disabled={saving}
                                        >
                                            <EyeOff size={15} />
                                            Unpublish
                                        </button>
                                    ) : status !== "ARCHIVED" ? (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleStatusAction(
                                                    experience,
                                                    "publish"
                                                )
                                            }
                                            disabled={saving}
                                        >
                                            <Eye size={15} />
                                            Publish
                                        </button>
                                    ) : null}

                                    {status !== "ARCHIVED" && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleStatusAction(
                                                    experience,
                                                    "archive"
                                                )
                                            }
                                            disabled={saving}
                                        >
                                            <Archive size={15} />
                                            Archive
                                        </button>
                                    )}

                                    <button
                                        type="button"
                                        className="danger"
                                        onClick={() =>
                                            handleDelete(experience)
                                        }
                                        disabled={saving}
                                    >
                                        <Trash2 size={15} />
                                        Delete
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AdminExperiencePage;
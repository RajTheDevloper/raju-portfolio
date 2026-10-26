
import { useCallback, useEffect, useState } from "react";
import { Edit, Plus, RefreshCw, Search, Trash2 } from "lucide-react";

import {
    createAdminTechnology,
    deleteAdminTechnology,
    getAdminTechnologies,
    updateAdminTechnology
} from "../../services/admin/technologyService";

import TechnologyForm from "../../components/admin/technologies/TechnologyForm";
import ConfirmDialog from "../../components/common/ConfirmDialog";

const normalizeTechnologies = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.content)) return data.content;
    if (Array.isArray(data?.technologies)) return data.technologies;
    return [];
};

const getErrorMessage = (error, fallback) =>
    error?.response?.data?.message ||
    error?.response?.data?.detail ||
    fallback;

function AdminTechnologiesPage() {
    const [technologies, setTechnologies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [search, setSearch] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingTechnology, setEditingTechnology] = useState(null);
    const [technologyToDelete, setTechnologyToDelete] = useState(null);

    const loadTechnologies = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getAdminTechnologies();
            setTechnologies(normalizeTechnologies(data));
        } catch (err) {
            console.error("Failed to load technologies:", err);
            setError(
                getErrorMessage(
                    err,
                    "Unable to load technologies. Please try again."
                )
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadTechnologies();
    }, [loadTechnologies]);

    const visibleTechnologies = technologies.filter((technology) => {
        const term = search.trim().toLowerCase();

        return (
            !term ||
            (technology.name || "").toLowerCase().includes(term) ||
            (technology.slug || "").toLowerCase().includes(term)
        );
    });

    const openCreateForm = () => {
        setEditingTechnology(null);
        setShowForm(true);
        setError("");
        setSuccess("");
    };

    const openEditForm = (technology) => {
        setEditingTechnology(technology);
        setShowForm(true);
        setError("");
        setSuccess("");
    };

    const handleSave = async (data) => {
        try {
            setSaving(true);
            setError("");
            setSuccess("");

            if (editingTechnology) {
                await updateAdminTechnology(editingTechnology.id, data);
                setSuccess("Technology updated successfully.");
            } else {
                await createAdminTechnology(data);
                setSuccess("Technology created successfully.");
            }

            setShowForm(false);
            setEditingTechnology(null);

            await loadTechnologies();
        } catch (err) {
            console.error("Failed to save technology:", err);

            setError(
                getErrorMessage(
                    err,
                    "Unable to save the technology. Please try again."
                )
            );

            // Keep the form open so the user can correct the problem.
            throw err;
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!technologyToDelete || deleting) return;

        try {
            setDeleting(true);
            setError("");
            setSuccess("");

            await deleteAdminTechnology(technologyToDelete.id);

            setSuccess(
                `"${technologyToDelete.name}" was deleted successfully.`
            );
            setTechnologyToDelete(null);

            await loadTechnologies();
        } catch (err) {
            console.error("Failed to delete technology:", err);

            setError(
                getErrorMessage(
                    err,
                    "Unable to delete the technology. It may still be referenced by a project."
                )
            );
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="admin-projects-page">
            <div className="admin-page-heading">
                <div>
                    <h2>Technologies</h2>
                    <p>
                        Manage the technologies displayed across your portfolio.
                    </p>
                </div>

                <button
                    type="button"
                    className="admin-save-button"
                    onClick={openCreateForm}
                    disabled={saving || deleting}
                >
                    <Plus size={18} />
                    Add Technology
                </button>
            </div>

            {error && (
                <div className="admin-alert admin-alert-error" role="alert">
                    {error}
                </div>
            )}

            {success && (
                <div className="admin-alert admin-alert-success" role="status">
                    {success}
                </div>
            )}

            {showForm && (
                <div className="admin-project-form-wrapper">
                    <TechnologyForm
                        technology={editingTechnology}
                        onSubmit={handleSave}
                        onCancel={() => {
                            if (saving) return;
                            setShowForm(false);
                            setEditingTechnology(null);
                        }}
                        saving={saving}
                    />
                </div>
            )}

            <div className="admin-project-toolbar">
                <div className="admin-project-search">
                    <Search size={18} />
                    <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search technologies..."
                        aria-label="Search technologies"
                    />
                </div>

                <button
                    type="button"
                    className="admin-refresh-button"
                    onClick={loadTechnologies}
                    disabled={loading || saving || deleting}
                >
                    <RefreshCw size={16} />
                    {loading ? "Refreshing..." : "Refresh"}
                </button>
            </div>

            {loading ? (
                <div className="admin-page-state">
                    <div className="admin-loading-spinner" />
                    <p>Loading technologies...</p>
                </div>
            ) : visibleTechnologies.length === 0 ? (
                <div className="admin-dashboard-card admin-project-empty">
                    <h3>No technologies found</h3>
                    <p>Try another search or add a technology.</p>
                </div>
            ) : (
                <div className="admin-project-table-wrapper">
                    <table className="admin-project-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {visibleTechnologies.map((technology) => (
                                <tr key={technology.id}>
                                    <td>{technology.id}</td>
                                    <td>{technology.name}</td>
                                    <td>{technology.slug}</td>
                                    <td>
                                        <div className="admin-project-actions">
                                            <button
                                                type="button"
                                                title="Edit technology"
                                                aria-label={`Edit ${technology.name}`}
                                                onClick={() =>
                                                    openEditForm(technology)
                                                }
                                                disabled={saving || deleting}
                                            >
                                                <Edit size={16} />
                                            </button>

                                            <button
                                                type="button"
                                                title="Delete technology"
                                                aria-label={`Delete ${technology.name}`}
                                                onClick={() => {
                                                    setError("");
                                                    setSuccess("");
                                                    setTechnologyToDelete(technology);
                                                }}
                                                disabled={saving || deleting}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {technologyToDelete && (
                <ConfirmDialog
                    title="Delete technology?"
                    message={`Are you sure you want to delete "${technologyToDelete.name}"? If projects reference this technology, the backend may reject the deletion.`}
                    confirmText="Delete Technology"
                    cancelText="Cancel"
                    danger
                    loading={deleting}
                    onConfirm={handleDelete}
                    onCancel={() => {
                        if (!deleting) setTechnologyToDelete(null);
                    }}
                />
            )}
        </div>
    );
}

export default AdminTechnologiesPage;

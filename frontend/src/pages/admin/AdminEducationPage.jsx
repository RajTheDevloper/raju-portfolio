
import { useCallback, useEffect, useMemo, useState } from "react";
import EducationForm from "../../components/admin/education/EducationForm";
import {
  getAdminEducations,
  createEducation,
  updateEducation,
  deleteEducation,
  publishEducation,
  unpublishEducation,
  archiveEducation,
} from "../../services/admin/educationService";

const getErrorMessage = (error) => {
  const data = error?.response?.data;

  if (typeof data === "string") return data;

  return (
    data?.message ||
    data?.detail ||
    (data?.errors ? Object.values(data.errors).join(", ") : null) ||
    error?.message ||
    "Something went wrong. Please try again."
  );
};

const formatDate = (date) => {
  if (!date) return "—";

  const parsed = new Date(`${date}T00:00:00`);
  return Number.isNaN(parsed.getTime())
    ? date
    : parsed.toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      });
};

const AdminEducationPage = () => {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadEducations = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getAdminEducations();
      setEducations(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEducations();
  }, [loadEducations]);

  const filteredEducations = useMemo(() => {
    const term = search.trim().toLowerCase();

    return educations
      .filter((education) => {
        const searchable = [
          education.institutionName,
          education.degree,
          education.fieldOfStudy,
          education.location,
        ];

        const matchesSearch =
          !term ||
          searchable.some((value) =>
            String(value ?? "").toLowerCase().includes(term)
          );

        const matchesStatus =
          statusFilter === "all" ||
          String(education.status ?? "").toUpperCase() === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort(
        (a, b) =>
          (a.displayOrder ?? 0) - (b.displayOrder ?? 0) ||
          (a.institutionName ?? "").localeCompare(b.institutionName ?? "")
      );
  }, [educations, search, statusFilter]);

  const openCreateForm = () => {
    setEditingEducation(null);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const openEditForm = (education) => {
    setEditingEducation(education);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingEducation(null);
  };

  const handleSave = async (educationData) => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (editingEducation) {
        await updateEducation(editingEducation.id, educationData);
        setSuccess("Education updated successfully.");
      } else {
        await createEducation(educationData);
        setSuccess("Education created successfully.");
      }

      closeForm();
      await loadEducations();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (education) => {
    if (
      !window.confirm(
        `Delete the education record "${education.degree}" at "${education.institutionName}"? This cannot be undone.`
      )
    ) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      await deleteEducation(education.id);
      setSuccess("Education record deleted successfully.");
      await loadEducations();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleStatusAction = async (education, action) => {
    if (
      action === "archive" &&
      !window.confirm(
        `Archive the education record at "${education.institutionName}"?`
      )
    ) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      if (action === "publish") {
        await publishEducation(education.id);
      } else if (action === "unpublish") {
        await unpublishEducation(education.id);
      } else {
        await archiveEducation(education.id);
      }

      setSuccess(`Education record ${action} action completed.`);
      await loadEducations();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const publishedCount = educations.filter(
    (item) => String(item.status).toUpperCase() === "PUBLISHED"
  ).length;

  const draftCount = educations.filter(
    (item) => String(item.status).toUpperCase() === "DRAFT"
  ).length;

  const archivedCount = educations.filter(
    (item) => String(item.status).toUpperCase() === "ARCHIVED"
  ).length;

  return (
    <main className="admin-education-page">
      <header className="admin-education-header">
        <div>
          <p className="admin-education-eyebrow">PORTFOLIO CONTENT</p>
          <h1>Education Management</h1>
          <p className="admin-education-subtitle">
            Manage your academic background and education timeline.
          </p>
        </div>

        {!showForm && (
          <button
            type="button"
            className="education-button education-button-primary"
            onClick={openCreateForm}
          >
            + Add education
          </button>
        )}
      </header>

      {error && (
        <div className="education-alert education-alert-error" role="alert">
          <span>{error}</span>
          <button type="button" onClick={() => setError("")}>Dismiss</button>
        </div>
      )}

      {success && (
        <div className="education-alert education-alert-success" role="status">
          <span>{success}</span>
          <button type="button" onClick={() => setSuccess("")}>Dismiss</button>
        </div>
      )}

      {showForm ? (
        <section className="education-panel">
          <EducationForm
            initialData={editingEducation}
            onSubmit={handleSave}
            onCancel={closeForm}
            saving={saving}
          />
        </section>
      ) : (
        <>
          <section className="education-summary-grid">
            <article className="education-summary-card">
              <span>Total records</span>
              <strong>{educations.length}</strong>
            </article>
            <article className="education-summary-card">
              <span>Published</span>
              <strong>{publishedCount}</strong>
            </article>
            <article className="education-summary-card">
              <span>Drafts</span>
              <strong>{draftCount}</strong>
            </article>
            <article className="education-summary-card">
              <span>Archived</span>
              <strong>{archivedCount}</strong>
            </article>
          </section>

          <section className="education-panel">
            <div className="education-toolbar">
              <div>
                <h2>Your education</h2>
                <p>
                  Showing {filteredEducations.length} of {educations.length} records
                </p>
              </div>

              <div className="education-filters">
                <input
                  type="search"
                  aria-label="Search education"
                  placeholder="Search institution, degree..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />

                <select
                  aria-label="Filter by status"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                >
                  <option value="all">All statuses</option>
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="education-empty-state">Loading education records...</div>
            ) : filteredEducations.length === 0 ? (
              <div className="education-empty-state">
                <h3>No education records found</h3>
                <p>
                  {educations.length === 0
                    ? "Add your first education record to get started."
                    : "Try changing your search or status filter."}
                </p>
                {educations.length === 0 && (
                  <button
                    type="button"
                    className="education-button education-button-primary"
                    onClick={openCreateForm}
                  >
                    Add education
                  </button>
                )}
              </div>
            ) : (
              <div className="education-table-wrapper">
                <table className="education-table">
                  <thead>
                    <tr>
                      <th>Institution / Degree</th>
                      <th>Location</th>
                      <th>Duration</th>
                      <th>Status</th>
                      <th>Order</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredEducations.map((education) => {
                      const status = String(
                        education.status ?? "UNKNOWN"
                      ).toUpperCase();

                      return (
                        <tr key={education.id}>
                          <td>
                            <div className="education-name-cell">
                              <strong>{education.institutionName}</strong>
                              <span>{education.degree}</span>
                              {education.fieldOfStudy && (
                                <small>{education.fieldOfStudy}</small>
                              )}
                            </div>
                          </td>

                          <td>{education.location || "—"}</td>

                          <td>
                            <div className="education-duration">
                              <span>
                                {formatDate(education.startDate)} –{" "}
                                {education.current
                                  ? "Present"
                                  : formatDate(education.endDate)}
                              </span>
                              {education.current && (
                                <small>Currently studying</small>
                              )}
                            </div>
                          </td>

                          <td>
                            <span
                              className={`education-status education-status-${status.toLowerCase()}`}
                            >
                              {status}
                            </span>
                          </td>

                          <td>{education.displayOrder ?? 0}</td>

                          <td>
                            <div className="education-row-actions">
                              <button
                                type="button"
                                onClick={() => openEditForm(education)}
                              >
                                Edit
                              </button>

                              {status === "PUBLISHED" ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleStatusAction(education, "unpublish")
                                  }
                                >
                                  Unpublish
                                </button>
                              ) : status === "ARCHIVED" ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleStatusAction(education, "unpublish")
                                  }
                                >
                                  Unpublish
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleStatusAction(education, "publish")
                                  }
                                >
                                  Publish
                                </button>
                              )}

                              {status !== "ARCHIVED" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleStatusAction(education, "archive")
                                  }
                                >
                                  Archive
                                </button>
                              )}

                              <button
                                type="button"
                                className="education-delete-action"
                                onClick={() => handleDelete(education)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
};

export default AdminEducationPage;

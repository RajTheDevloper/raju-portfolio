
import { useCallback, useEffect, useMemo, useState } from "react";
import SkillForm from "../../components/admin/skill/SkillForm";
import {
  getAdminSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  publishSkill,
  unpublishSkill,
  archiveSkill,
} from "../../services/admin/skillService";

const getErrorMessage = (error) => {
  const data = error?.response?.data;

  if (typeof data === "string") {
    return data;
  }

  return (
    data?.message ||
    data?.detail ||
    (data?.errors
      ? Object.values(data.errors).join(", ")
      : null) ||
    error?.message ||
    "Something went wrong. Please try again."
  );
};

const AdminSkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadSkills = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getAdminSkills();
      setSkills(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSkills();
  }, [loadSkills]);

  const categories = useMemo(
    () =>
      [...new Set(skills.map((skill) => skill.category).filter(Boolean))]
        .sort((a, b) => a.localeCompare(b)),
    [skills]
  );

  const filteredSkills = useMemo(() => {
    const term = search.trim().toLowerCase();

    return skills
      .filter((skill) => {
        const matchesSearch =
          !term ||
          [skill.name, skill.slug, skill.category, skill.proficiency]
            .some((value) =>
              String(value ?? "").toLowerCase().includes(term)
            );

        const matchesCategory =
          categoryFilter === "all" ||
          skill.category === categoryFilter;

        const matchesStatus =
          statusFilter === "all" ||
          String(skill.status ?? "").toUpperCase() ===
            statusFilter.toUpperCase();

        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort(
        (a, b) =>
          (a.displayOrder ?? 0) - (b.displayOrder ?? 0) ||
          (a.name ?? "").localeCompare(b.name ?? "")
      );
  }, [skills, search, categoryFilter, statusFilter]);

  const openCreateForm = () => {
    setEditingSkill(null);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const openEditForm = (skill) => {
    setEditingSkill(skill);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingSkill(null);
  };

  const handleSave = async (skillData) => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (editingSkill) {
        await updateSkill(editingSkill.id, skillData);
        setSuccess("Skill updated successfully.");
      } else {
        await createSkill(skillData);
        setSuccess("Skill created successfully.");
      }

      closeForm();
      await loadSkills();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (skill) => {
    const confirmed = window.confirm(
      `Delete "${skill.name}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    try {
      await deleteSkill(skill.id);
      setSuccess(`"${skill.name}" was deleted.`);
      await loadSkills();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleStatusAction = async (skill, action) => {
    const actionLabels = {
      publish: "publish",
      unpublish: "unpublish",
      archive: "archive",
    };

    if (
      action === "archive" &&
      !window.confirm(`Archive "${skill.name}"?`)
    ) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      if (action === "publish") {
        await publishSkill(skill.id);
      } else if (action === "unpublish") {
        await unpublishSkill(skill.id);
      } else if (action === "archive") {
        await archiveSkill(skill.id);
      }

      setSuccess(
        `"${skill.name}" was ${actionLabels[action]}ed successfully.`
      );
      await loadSkills();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const getStatusClass = (status) =>
    `skill-status skill-status-${String(status ?? "unknown")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <main className="admin-skills-page">
      <header className="admin-skills-header">
        <div>
          <p className="admin-skills-eyebrow">PORTFOLIO CONTENT</p>
          <h1>Skills Management</h1>
          <p className="admin-skills-subtitle">
            Manage your technical skills, proficiency, and visibility.
          </p>
        </div>

        {!showForm && (
          <button
            type="button"
            className="skill-button skill-button-primary"
            onClick={openCreateForm}
          >
            + Add skill
          </button>
        )}
      </header>

      {error && (
        <div className="skill-alert skill-alert-error" role="alert">
          <span>{error}</span>
          <button type="button" onClick={() => setError("")}>
            Dismiss
          </button>
        </div>
      )}

      {success && (
        <div className="skill-alert skill-alert-success" role="status">
          <span>{success}</span>
          <button type="button" onClick={() => setSuccess("")}>
            Dismiss
          </button>
        </div>
      )}

      {showForm ? (
        <section className="skill-panel">
          <SkillForm
            initialData={editingSkill}
            onSubmit={handleSave}
            onCancel={closeForm}
            saving={saving}
          />
        </section>
      ) : (
        <>
          <section className="skill-summary-grid">
            <article className="skill-summary-card">
              <span>Total skills</span>
              <strong>{skills.length}</strong>
            </article>
            <article className="skill-summary-card">
              <span>Published</span>
              <strong>
                {skills.filter(
                  (skill) =>
                    String(skill.status).toUpperCase() === "PUBLISHED"
                ).length}
              </strong>
            </article>
            <article className="skill-summary-card">
              <span>Featured</span>
              <strong>{skills.filter((skill) => skill.featured).length}</strong>
            </article>
            <article className="skill-summary-card">
              <span>Categories</span>
              <strong>{categories.length}</strong>
            </article>
          </section>

          <section className="skill-panel">
            <div className="skill-toolbar">
              <div>
                <h2>Your skills</h2>
                <p>
                  Showing {filteredSkills.length} of {skills.length} skills
                </p>
              </div>

              <div className="skill-filters">
                <input
                  aria-label="Search skills"
                  type="search"
                  placeholder="Search skills..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />

                <select
                  aria-label="Filter by category"
                  value={categoryFilter}
                  onChange={(event) =>
                    setCategoryFilter(event.target.value)
                  }
                >
                  <option value="all">All categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter by status"
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                >
                  <option value="all">All statuses</option>
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="skill-empty-state">Loading skills...</div>
            ) : filteredSkills.length === 0 ? (
              <div className="skill-empty-state">
                <h3>No skills found</h3>
                <p>
                  {skills.length === 0
                    ? "Add your first skill to get started."
                    : "Try changing your search or filters."}
                </p>
                {skills.length === 0 && (
                  <button
                    type="button"
                    className="skill-button skill-button-primary"
                    onClick={openCreateForm}
                  >
                    Add your first skill
                  </button>
                )}
              </div>
            ) : (
              <div className="skill-table-wrapper">
                <table className="skill-table">
                  <thead>
                    <tr>
                      <th>Skill</th>
                      <th>Category</th>
                      <th>Proficiency</th>
                      <th>Experience</th>
                      <th>Featured</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredSkills.map((skill) => {
                      const status = String(
                        skill.status ?? "UNKNOWN"
                      ).toUpperCase();

                      return (
                        <tr key={skill.id}>
                          <td>
                            <div className="skill-name-cell">
                              <strong>{skill.name}</strong>
                              <small>{skill.slug}</small>
                              <small>Order: {skill.displayOrder ?? 0}</small>
                            </div>
                          </td>

                          <td>{skill.category}</td>

                          <td>
                            <span className="skill-proficiency">
                              {skill.proficiency}
                            </span>
                          </td>

                          <td>
                            {skill.yearsOfExperience}{" "}
                            {skill.yearsOfExperience === 1 ? "year" : "years"}
                          </td>

                          <td>
                            {skill.featured ? (
                              <span className="skill-featured">Featured</span>
                            ) : (
                              <span className="skill-not-featured">—</span>
                            )}
                          </td>

                          <td>
                            <span className={getStatusClass(status)}>
                              {status}
                            </span>
                          </td>

                          <td>
                            <div className="skill-row-actions">
                              <button
                                type="button"
                                onClick={() => openEditForm(skill)}
                              >
                                Edit
                              </button>

                              {status === "PUBLISHED" ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleStatusAction(skill, "unpublish")
                                  }
                                >
                                  Unpublish
                                </button>
                              ) : status === "ARCHIVED" ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleStatusAction(skill, "unpublish")
                                  }
                                >
                                  Unpublish
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleStatusAction(skill, "publish")
                                  }
                                >
                                  Publish
                                </button>
                              )}

                              {status !== "ARCHIVED" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleStatusAction(skill, "archive")
                                  }
                                >
                                  Archive
                                </button>
                              )}

                              <button
                                type="button"
                                className="skill-delete-action"
                                onClick={() => handleDelete(skill)}
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

export default AdminSkillsPage;

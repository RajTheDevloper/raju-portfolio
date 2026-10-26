import { useEffect, useState } from "react";

const createSlug = (value) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

function TechnologyForm({
    technology,
    onSubmit,
    onCancel,
    saving
}) {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [slugEdited, setSlugEdited] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setName(technology?.name ?? "");
        setSlug(technology?.slug ?? "");
        setSlugEdited(Boolean(technology));
        setError("");
    }, [technology]);

    const handleNameChange = (value) => {
        setName(value);

        if (!slugEdited) {
            setSlug(createSlug(value));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!name.trim() || !slug.trim()) {
            setError("Both name and slug are required.");
            return;
        }

        try {
            await onSubmit({
                name: name.trim(),
                slug: slug.trim()
            });
        } catch {
            // The parent page displays the API error.
        }
    };

    return (
        <form
            className="admin-technology-form"
            onSubmit={handleSubmit}
        >
            <div className="admin-technology-form-header">
                <h3>
                    {technology ? "Edit Technology" : "Add Technology"}
                </h3>
                <p>
                    Add a technology to display in your portfolio.
                </p>
            </div>

            <div className="admin-technology-form-fields">
                <div className="admin-technology-form-group">
                    <label htmlFor="technology-name">
                        Technology Name
                    </label>
                    <input
                        id="technology-name"
                        type="text"
                        value={name}
                        onChange={(event) =>
                            handleNameChange(event.target.value)
                        }
                        placeholder="e.g. Spring Boot"
                        maxLength={150}
                        required
                        disabled={saving}
                    />
                </div>

                <div className="admin-technology-form-group">
                    <label htmlFor="technology-slug">
                        Slug
                    </label>
                    <input
                        id="technology-slug"
                        type="text"
                        value={slug}
                        onChange={(event) => {
                            setSlug(event.target.value);
                            setSlugEdited(true);
                        }}
                        placeholder="e.g. spring-boot"
                        maxLength={200}
                        required
                        disabled={saving}
                    />
                    <small>
                        A URL-friendly identifier. You can edit it manually.
                    </small>
                </div>
            </div>

            {error && (
                <div
                    className="admin-alert admin-alert-error"
                    role="alert"
                >
                    {error}
                </div>
            )}

            <div className="admin-technology-form-actions">
                <button
                    className="admin-technology-save-button"
                    type="submit"
                    disabled={saving}
                >
                    {saving ? "Saving..." : "Save Technology"}
                </button>

                <button
                    className="admin-technology-cancel-button"
                    type="button"
                    onClick={onCancel}
                    disabled={saving}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default TechnologyForm;
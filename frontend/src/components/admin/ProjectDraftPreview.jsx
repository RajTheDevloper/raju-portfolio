import { useEffect, useState } from "react";
import { getProjectDraftPreview } from "../../services/admin/projectService";

function ProjectDraftPreview({ project, onClose }) {
    const [draft, setDraft] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadPreview = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getProjectDraftPreview(project.id);
                setDraft(data);
            } catch (err) {
                console.error("Failed to load draft preview:", err);

                setError(
                    err.response?.data?.message ||
                    "Unable to load the saved draft."
                );
            } finally {
                setLoading(false);
            }
        };

        loadPreview();
    }, [project.id]);

    return (
        <div className="revision-overlay">
            <section
                className="revision-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="draft-preview-title"
            >
                <header className="revision-header">
                    <div>
                        <h2 id="draft-preview-title">Draft Preview</h2>
                        <p>Review saved changes before publishing.</p>
                    </div>

                    <button
                        type="button"
                        className="revision-close"
                        onClick={onClose}
                        aria-label="Close preview"
                    >
                        ×
                    </button>
                </header>

                {loading && <p>Loading draft...</p>}

                {!loading && error && (
                    <p className="revision-error">{error}</p>
                )}

                {!loading && !error && draft && (
                    <div className="revision-details">
                        <p>
                            <strong>Status:</strong>{" "}
                            {draft.status || "Unknown"}
                        </p>

                        <h3>{draft.name}</h3>

                        <p>
                            <strong>Slug:</strong> {draft.slug}
                        </p>

                        <p>{draft.description}</p>

                        <p>
                            <strong>Technologies:</strong>{" "}
                            {draft.technologies
                                ?.map((technology) => technology.name)
                                .join(", ") || "None"}
                        </p>

                        <p>
                            <strong>Featured:</strong>{" "}
                            {draft.featured ? "Yes" : "No"}
                        </p>

                        <p>
                            <strong>GitHub:</strong>{" "}
                            {draft.githubUrl || "Not provided"}
                        </p>

                        <p>
                            <strong>Live URL:</strong>{" "}
                            {draft.liveUrl || "Not provided"}
                        </p>

                        <p>
                            <strong>Display order:</strong>{" "}
                            {draft.displayOrder}
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}

export default ProjectDraftPreview;
import { useEffect, useState } from "react";
import { getProjectRevisions } from "../../services/admin/revisionService";

function RevisionHistory({ project, onClose }) {
    const [revisions, setRevisions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadRevisions = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getProjectRevisions(project.id);

                setRevisions(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Failed to load revisions:", err);

                setError(
                    err.response?.data?.message ||
                    "Unable to load revision history."
                );
            } finally {
                setLoading(false);
            }
        };

        loadRevisions();
    }, [project.id]);

    const parseSnapshot = (snapshot) => {
        try {
            return typeof snapshot === "string"
                ? JSON.parse(snapshot)
                : snapshot;
        } catch {
            return null;
        }
    };

    const formatDate = (dateValue) => {
        if (!dateValue) return "Unknown date";

        const date = new Date(dateValue);

        return Number.isNaN(date.getTime())
            ? dateValue
            : date.toLocaleString();
    };

    return (
        <div className="revision-overlay">
            <section
                className="revision-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="revision-title"
            >
                <header className="revision-header">
                    <div>
                        <h2 id="revision-title">Revision History</h2>
                        <p>{project.name}</p>
                    </div>

                    <button
                        type="button"
                        className="revision-close"
                        onClick={onClose}
                        aria-label="Close revision history"
                    >
                        ×
                    </button>
                </header>

                {loading && (
                    <p className="revision-message">
                        Loading revision history...
                    </p>
                )}

                {!loading && error && (
                    <p className="revision-error">{error}</p>
                )}

                {!loading && !error && revisions.length === 0 && (
                    <p className="revision-message">
                        No revisions found for this project.
                    </p>
                )}

                {!loading && !error && revisions.length > 0 && (
                    <div className="revision-list">
                        {revisions.map((revision) => {
                            const snapshot = parseSnapshot(
                                revision.snapshot
                            );

                            return (
                                <article
                                    className="revision-card"
                                    key={revision.id}
                                >
                                    <div className="revision-card-header">
                                        <h3>
                                            Version {revision.versionNumber}
                                        </h3>

                                        <span
                                            className={`revision-status ${
                                                revision.status?.toLowerCase()
                                            }`}
                                        >
                                            {revision.status}
                                        </span>
                                    </div>

                                    <p className="revision-meta">
                                        Created:{" "}
                                        {formatDate(revision.createdAt)}
                                    </p>

                                    <p className="revision-meta">
                                        Created by:{" "}
                                        {revision.createdBy || "Unknown"}
                                    </p>

                                    {snapshot ? (
                                        <div className="revision-details">
                                            <h4>{snapshot.name}</h4>

                                            <p>
                                                <strong>Slug:</strong>{" "}
                                                {snapshot.slug || "—"}
                                            </p>

                                            <p>
                                                <strong>Description:</strong>{" "}
                                                {snapshot.description || "—"}
                                            </p>

                                            <p>
                                                <strong>Featured:</strong>{" "}
                                                {snapshot.featured
                                                    ? "Yes"
                                                    : "No"}
                                            </p>

                                            <p>
                                                <strong>GitHub:</strong>{" "}
                                                {snapshot.githubUrl || "—"}
                                            </p>

                                            <p>
                                                <strong>Live URL:</strong>{" "}
                                                {snapshot.liveUrl || "—"}
                                            </p>

                                            <p>
                                                <strong>Technologies:</strong>{" "}
                                                {snapshot.technologies
                                                    ?.map((technology) =>
                                                        technology.name
                                                    )
                                                    .join(", ") || "None"}
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="revision-error">
                                            This revision's snapshot could
                                            not be parsed.
                                        </p>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
}

export default RevisionHistory;
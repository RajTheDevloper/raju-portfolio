
import { useEffect, useState } from "react";
import { getPublicTechnologies } from "../../../services/technologyService";
import { getAdminMedia } from "../../../services/admin/mediaService";

const emptyProject = {
    name: "",
    slug: "",
    description: "",
    githubUrl: "",
    liveUrl: "",
    technologyIds: [],
    imageMediaId: "",
    featured: false,
    displayOrder: 1,
};

function ProjectForm({ initialProject, onSubmit, onCancel, saving = false }) {
    const [form, setForm] = useState(emptyProject);
    const [technologies, setTechnologies] = useState([]);
    const [mediaItems, setMediaItems] = useState([]);
    const [loadingOptions, setLoadingOptions] = useState(true);
    const [optionsError, setOptionsError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadOptions() {
            try {
                setLoadingOptions(true);
                setOptionsError("");

                const [technologyData, mediaData] = await Promise.all([
                    getPublicTechnologies(),
                    getAdminMedia(),
                ]);

                if (!active) return;

                const technologyList = Array.isArray(technologyData)
                    ? technologyData
                    : technologyData?.content ?? technologyData?.technologies ?? [];

                const mediaList = Array.isArray(mediaData)
                    ? mediaData
                    : mediaData?.content ?? [];

                setTechnologies(technologyList);

                setMediaItems(
                    mediaList.filter(
                        (item) =>
                            item.contentType?.startsWith("image/") &&
                            item.mediaType === "PROJECT_IMAGE"
                    )
                );
            } catch (error) {
                if (active) {
                    setOptionsError(
                        error.response?.data?.message ||
                        "Could not load technologies or media. Check your backend and admin login."
                    );
                }
            } finally {
                if (active) setLoadingOptions(false);
            }
        }

        loadOptions();

        return () => {
            active = false;
        };
    }, []);

    useEffect(() => {
        if (!initialProject) {
            setForm(emptyProject);
            return;
        }

        const existingTechnologyIds =
            initialProject.technologyIds ??
            initialProject.technologies?.map((technology) =>
                typeof technology === "object" ? technology.id : null
            ).filter((id) => id != null) ??
            [];

        setForm({
            name: initialProject.name ?? "",
            slug: initialProject.slug ?? "",
            description: initialProject.description ?? "",
            githubUrl: initialProject.githubUrl ?? "",
            liveUrl: initialProject.liveUrl ?? "",
            technologyIds: existingTechnologyIds.map(Number),
            imageMediaId: initialProject.imageMediaId ??
                initialProject.imageMedia?.id ??
                "",
            featured: Boolean(initialProject.featured),
            displayOrder: initialProject.displayOrder ?? 1,
        });
    }, [initialProject]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setForm((current) => ({
            ...current,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleTechnologyChange = (technologyId, checked) => {
        setForm((current) => ({
            ...current,
            technologyIds: checked
                ? [...new Set([...current.technologyIds, Number(technologyId)])]
                : current.technologyIds.filter(
                    (id) => id !== Number(technologyId)
                ),
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (form.technologyIds.length === 0) {
            setOptionsError("Select at least one technology.");
            return;
        }

        if (!form.imageMediaId) {
            setOptionsError("Select an image for this project.");
            return;
        }

        setOptionsError("");

        onSubmit({
            name: form.name.trim(),
            slug: form.slug.trim().toLowerCase(),
            description: form.description.trim(),
            technologyIds: form.technologyIds.map(Number),
            githubUrl: form.githubUrl.trim(),
            liveUrl: form.liveUrl.trim(),
            imageMediaId: Number(form.imageMediaId),
            featured: form.featured,
            displayOrder: Number(form.displayOrder),
        });
    };

    return (
        <form className="admin-form" onSubmit={handleSubmit}>
            <h2>{initialProject ? "Edit Project" : "Create Project"}</h2>

            {loadingOptions && <p>Loading technologies and media...</p>}

            {optionsError && (
                <p className="form-error" role="alert">
                    {optionsError}
                </p>
            )}

            <label>
                Project Name
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    maxLength={150}
                    required
                />
            </label>

            <label>
                Slug
                <input
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    maxLength={200}
                    pattern="[a-zA-Z0-9-]+"
                    title="Use letters, numbers, and hyphens only."
                    required
                />
            </label>

            <label>
                Description
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    maxLength={5000}
                    rows={5}
                    required
                />
            </label>

            <label>
                GitHub URL
                <input
                    type="url"
                    name="githubUrl"
                    value={form.githubUrl}
                    onChange={handleChange}
                    placeholder="https://github.com/username/project"
                    maxLength={500}
                />
            </label>

            <label>
                Live Project URL
                <input
                    type="url"
                    name="liveUrl"
                    value={form.liveUrl}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    maxLength={500}
                />
            </label>

            <fieldset>
                <legend>Technologies (select at least one)</legend>

                {technologies.length === 0 && !loadingOptions && (
                    <p>No technologies were returned by the API.</p>
                )}

                {technologies.map((technology) => (
                    <label key={technology.id} className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={form.technologyIds.includes(
                                Number(technology.id)
                            )}
                            onChange={(event) =>
                                handleTechnologyChange(
                                    technology.id,
                                    event.target.checked
                                )
                            }
                        />
                        {technology.name}
                    </label>
                ))}
            </fieldset>

            <label>
                Project Image
                <select
                    name="imageMediaId"
                    value={form.imageMediaId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select an uploaded image</option>

                    {mediaItems.map((media) => (
                        <option key={media.id} value={media.id}>
                            {media.originalFileName} (ID: {media.id})
                        </option>
                    ))}
                </select>
            </label>

            {!loadingOptions && mediaItems.length === 0 && (
                <p>
                    No images are available. Upload an image through your
                    admin media feature before creating this project.
                </p>
            )}

            <label>
                Display Order
                <input
                    type="number"
                    name="displayOrder"
                    value={form.displayOrder}
                    onChange={handleChange}
                    min="0"
                    step="1"
                    required
                />
            </label>

            <label className="checkbox-label">
                <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                />
                Featured Project
            </label>

            <div className="admin-form-actions">
                <button
                    type="submit"
                    disabled={
                        saving ||
                        loadingOptions ||
                        technologies.length === 0 ||
                        mediaItems.length === 0
                    }
                >
                    {saving ? "Saving..." : "Save Project"}
                </button>

                <button type="button" onClick={onCancel} disabled={saving}>
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default ProjectForm;

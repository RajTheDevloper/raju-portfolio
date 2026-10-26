
import { useEffect, useState } from "react";
import { Save, RotateCcw } from "lucide-react";

const EMPTY_SETTINGS = {
    siteName: "",
    tagline: "",
    siteDescription: "",
    contactEmail: "",
    githubUrl: "",
    linkedinUrl: "",
    twitterUrl: "",
    footerText: "",
    seoTitle: "",
    seoDescription: "",
    maintenanceMode: false,
};

const SiteSettingsForm = ({
    settings,
    saving,
    onSave,
}) => {
    const [formData, setFormData] = useState(EMPTY_SETTINGS);

    useEffect(() => {
        setFormData({
            ...EMPTY_SETTINGS,
            ...(settings || {}),
            maintenanceMode: settings?.maintenanceMode ?? false,
        });
    }, [settings]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(formData);
    };

    const handleReset = () => {
        setFormData({
            ...EMPTY_SETTINGS,
            ...(settings || {}),
            maintenanceMode: settings?.maintenanceMode ?? false,
        });
    };

    return (
        <form className="settings-form" onSubmit={handleSubmit}>
            <section className="settings-section">
                <div className="settings-section-heading">
                    <div>
                        <h2>General information</h2>
                        <p>Control your portfolio's identity and description.</p>
                    </div>
                </div>

                <div className="settings-form-grid">
                    <div className="settings-field">
                        <label htmlFor="siteName">Site name *</label>
                        <input
                            id="siteName"
                            name="siteName"
                            value={formData.siteName}
                            onChange={handleChange}
                            maxLength={150}
                            required
                        />
                    </div>

                    <div className="settings-field">
                        <label htmlFor="tagline">Tagline</label>
                        <input
                            id="tagline"
                            name="tagline"
                            value={formData.tagline}
                            onChange={handleChange}
                            maxLength={300}
                            placeholder="Java Backend Developer"
                        />
                    </div>

                    <div className="settings-field settings-field-full">
                        <label htmlFor="siteDescription">Site description</label>
                        <textarea
                            id="siteDescription"
                            name="siteDescription"
                            value={formData.siteDescription}
                            onChange={handleChange}
                            maxLength={1000}
                            rows={4}
                        />
                        <small>{formData.siteDescription.length}/1000 characters</small>
                    </div>

                    <div className="settings-field">
                        <label htmlFor="contactEmail">Contact email</label>
                        <input
                            id="contactEmail"
                            name="contactEmail"
                            type="email"
                            value={formData.contactEmail}
                            onChange={handleChange}
                            maxLength={200}
                        />
                    </div>

                    <div className="settings-field">
                        <label htmlFor="footerText">Footer text</label>
                        <input
                            id="footerText"
                            name="footerText"
                            value={formData.footerText}
                            onChange={handleChange}
                            maxLength={500}
                        />
                    </div>
                </div>
            </section>

            <section className="settings-section">
                <div className="settings-section-heading">
                    <div>
                        <h2>Social links</h2>
                        <p>Add links to your professional profiles.</p>
                    </div>
                </div>

                <div className="settings-form-grid">
                    <div className="settings-field">
                        <label htmlFor="githubUrl">GitHub URL</label>
                        <input
                            id="githubUrl"
                            name="githubUrl"
                            type="url"
                            value={formData.githubUrl}
                            onChange={handleChange}
                            placeholder="https://github.com/username"
                        />
                    </div>

                    <div className="settings-field">
                        <label htmlFor="linkedinUrl">LinkedIn URL</label>
                        <input
                            id="linkedinUrl"
                            name="linkedinUrl"
                            type="url"
                            value={formData.linkedinUrl}
                            onChange={handleChange}
                            placeholder="https://linkedin.com/in/username"
                        />
                    </div>

                    <div className="settings-field">
                        <label htmlFor="twitterUrl">Twitter / X URL</label>
                        <input
                            id="twitterUrl"
                            name="twitterUrl"
                            type="url"
                            value={formData.twitterUrl}
                            onChange={handleChange}
                            placeholder="https://x.com/username"
                        />
                    </div>
                </div>
            </section>

            <section className="settings-section">
                <div className="settings-section-heading">
                    <div>
                        <h2>SEO settings</h2>
                        <p>Configure the default title and description for search engines.</p>
                    </div>
                </div>

                <div className="settings-form-grid">
                    <div className="settings-field settings-field-full">
                        <label htmlFor="seoTitle">SEO title</label>
                        <input
                            id="seoTitle"
                            name="seoTitle"
                            value={formData.seoTitle}
                            onChange={handleChange}
                            maxLength={200}
                        />
                        <small>{formData.seoTitle.length}/200 characters</small>
                    </div>

                    <div className="settings-field settings-field-full">
                        <label htmlFor="seoDescription">SEO description</label>
                        <textarea
                            id="seoDescription"
                            name="seoDescription"
                            value={formData.seoDescription}
                            onChange={handleChange}
                            maxLength={500}
                            rows={3}
                        />
                        <small>{formData.seoDescription.length}/500 characters</small>
                    </div>
                </div>
            </section>

            <section className="settings-section settings-maintenance">
                <div>
                    <h2>Maintenance mode</h2>
                    <p>
                        This setting is saved to the backend. Enabling it will affect
                        visitors only if the backend or frontend already enforces it.
                    </p>
                </div>

                <label className="settings-toggle">
                    <input
                        type="checkbox"
                        name="maintenanceMode"
                        checked={formData.maintenanceMode}
                        onChange={handleChange}
                    />
                    <span>{formData.maintenanceMode ? "Enabled" : "Disabled"}</span>
                </label>
            </section>

            <div className="settings-form-actions">
                <button
                    type="button"
                    className="admin-btn admin-btn-secondary"
                    onClick={handleReset}
                    disabled={saving}
                >
                    <RotateCcw size={16} />
                    Reset changes
                </button>

                <button
                    type="submit"
                    className="admin-btn admin-btn-primary"
                    disabled={saving}
                >
                    <Save size={16} />
                    {saving ? "Saving..." : "Save settings"}
                </button>
            </div>
        </form>
    );
};

export default SiteSettingsForm;

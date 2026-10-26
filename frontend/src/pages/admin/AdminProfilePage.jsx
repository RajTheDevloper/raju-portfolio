import { useEffect, useState } from "react";
import { Save, RefreshCw } from "lucide-react";

import {
    getAdminProfile,
    updateAdminProfile
} from "../../services/admin/profileService";

const initialForm = {
    name: "",
    title: "",
    shortBio: "",
    about: "",
    location: "",
    availability: "",
    email: "",
    phone: "",
    seoTitle: "",
    seoDescription: "",
    githubUrl: "",
    linkedinUrl: ""
};

const AdminProfilePage = () => {

    const [formData, setFormData] = useState(initialForm);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const loadProfile = async () => {

        try {

            setLoading(true);
            setError("");
            setSuccess("");

            const data = await getAdminProfile();

            setFormData({
                name: data?.name || "",
                title: data?.title || "",
                shortBio: data?.shortBio || "",
                about: data?.about || "",
                location: data?.location || "",
                availability: data?.availability || "",
                email: data?.email || "",
                phone: data?.phone || "",
                seoTitle: data?.seoTitle || "",
                seoDescription: data?.seoDescription || "",
                githubUrl: data?.githubUrl || "",
                linkedinUrl: data?.linkedinUrl || ""
            });

        } catch (err) {

            console.error(
                "Failed to load profile:",
                err
            );

            setError(
                err?.response?.data?.message ||
                "Failed to load profile."
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setSuccess("");
        setError("");
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setSaving(true);
            setError("");
            setSuccess("");

            const updatedProfile =
                await updateAdminProfile(formData);

            setFormData({
                name: updatedProfile?.name || "",
                title: updatedProfile?.title || "",
                shortBio: updatedProfile?.shortBio || "",
                about: updatedProfile?.about || "",
                location: updatedProfile?.location || "",
                availability:
                    updatedProfile?.availability || "",
                email: updatedProfile?.email || "",
                phone: updatedProfile?.phone || "",
                seoTitle:
                    updatedProfile?.seoTitle || "",
                seoDescription:
                    updatedProfile?.seoDescription || "",
                githubUrl:
                    updatedProfile?.githubUrl || "",
                linkedinUrl:
                    updatedProfile?.linkedinUrl || ""
            });

            setSuccess(
                "Profile updated successfully."
            );

        } catch (err) {

            console.error(
                "Failed to update profile:",
                err
            );

            setError(
                err?.response?.data?.message ||
                "Failed to update profile."
            );

        } finally {

            setSaving(false);

        }
    };

    if (loading) {
        return (
            <div className="admin-page-state">

                <div className="admin-loading-spinner" />

                <p>
                    Loading profile...
                </p>

            </div>
        );
    }

    return (
        <div className="admin-form-page">

            <div className="admin-page-heading">

                <div>
                    <h2>
                        Profile
                    </h2>

                    <p>
                        Manage the information displayed
                        on your portfolio.
                    </p>
                </div>

                <button
                    type="button"
                    className="admin-refresh-button"
                    onClick={loadProfile}
                    disabled={saving}
                >
                    <RefreshCw size={17} />
                    Reload
                </button>

            </div>


            {error && (
                <div className="admin-alert admin-alert-error">
                    {error}
                </div>
            )}


            {success && (
                <div className="admin-alert admin-alert-success">
                    {success}
                </div>
            )}


            <form
                className="admin-form-card"
                onSubmit={handleSubmit}
            >

                {/* =========================
                    BASIC INFORMATION
                   ========================= */}

                <div className="admin-form-section">

                    <div className="admin-form-section-heading">

                        <h3>
                            Basic Information
                        </h3>

                        <p>
                            Main information shown on
                            your portfolio.
                        </p>

                    </div>


                    <div className="admin-form-grid">

                        <div className="admin-form-field">

                            <label htmlFor="name">
                                Name
                            </label>

                            <input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="admin-form-field">

                            <label htmlFor="title">
                                Professional Title
                            </label>

                            <input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="admin-form-field admin-field-full">

                            <label htmlFor="shortBio">
                                Short Bio
                            </label>

                            <textarea
                                id="shortBio"
                                name="shortBio"
                                value={formData.shortBio}
                                onChange={handleChange}
                                rows="3"
                            />

                        </div>


                        <div className="admin-form-field admin-field-full">

                            <label htmlFor="about">
                                About
                            </label>

                            <textarea
                                id="about"
                                name="about"
                                value={formData.about}
                                onChange={handleChange}
                                rows="6"
                            />

                        </div>

                    </div>

                </div>


                {/* =========================
                    CONTACT INFORMATION
                   ========================= */}

                <div className="admin-form-section">

                    <div className="admin-form-section-heading">

                        <h3>
                            Contact Information
                        </h3>

                        <p>
                            Contact and availability details.
                        </p>

                    </div>


                    <div className="admin-form-grid">

                        <div className="admin-form-field">

                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="admin-form-field">

                            <label htmlFor="phone">
                                Phone
                            </label>

                            <input
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="admin-form-field">

                            <label htmlFor="location">
                                Location
                            </label>

                            <input
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="admin-form-field">

                            <label htmlFor="availability">
                                Availability
                            </label>

                            <input
                                id="availability"
                                name="availability"
                                value={formData.availability}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                </div>


                {/* =========================
                    SOCIAL LINKS
                   ========================= */}

                <div className="admin-form-section">

                    <div className="admin-form-section-heading">

                        <h3>
                            Social Links
                        </h3>

                        <p>
                            Links displayed throughout
                            the portfolio.
                        </p>

                    </div>


                    <div className="admin-form-grid">

                        <div className="admin-form-field">

                            <label htmlFor="githubUrl">
                                GitHub URL
                            </label>

                            <input
                                id="githubUrl"
                                name="githubUrl"
                                type="url"
                                value={formData.githubUrl}
                                onChange={handleChange}
                                placeholder="https://github.com/..."
                            />

                        </div>


                        <div className="admin-form-field">

                            <label htmlFor="linkedinUrl">
                                LinkedIn URL
                            </label>

                            <input
                                id="linkedinUrl"
                                name="linkedinUrl"
                                type="url"
                                value={formData.linkedinUrl}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/..."
                            />

                        </div>

                    </div>

                </div>


                {/* =========================
                    SEO
                   ========================= */}

                <div className="admin-form-section">

                    <div className="admin-form-section-heading">

                        <h3>
                            SEO
                        </h3>

                        <p>
                            Search engine metadata for your
                            portfolio.
                        </p>

                    </div>


                    <div className="admin-form-grid">

                        <div className="admin-form-field admin-field-full">

                            <label htmlFor="seoTitle">
                                SEO Title
                            </label>

                            <input
                                id="seoTitle"
                                name="seoTitle"
                                value={formData.seoTitle}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="admin-form-field admin-field-full">

                            <label htmlFor="seoDescription">
                                SEO Description
                            </label>

                            <textarea
                                id="seoDescription"
                                name="seoDescription"
                                value={formData.seoDescription}
                                onChange={handleChange}
                                rows="4"
                            />

                        </div>

                    </div>

                </div>


                {/* =========================
                    SAVE
                   ========================= */}

                <div className="admin-form-actions">

                    <button
                        type="submit"
                        className="admin-save-button"
                        disabled={saving}
                    >

                        {saving ? (
                            <>
                                <RefreshCw
                                    size={17}
                                    className="admin-button-spinner"
                                />

                                Saving...
                            </>
                        ) : (
                            <>
                                <Save size={17} />

                                Save Changes
                            </>
                        )}

                    </button>

                </div>

            </form>

        </div>
    );
};

export default AdminProfilePage;
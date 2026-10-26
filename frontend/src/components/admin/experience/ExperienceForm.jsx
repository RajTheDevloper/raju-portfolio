import { useEffect, useState } from "react";

const emptyForm = {
    companyName: "",
    jobTitle: "",
    location: "",
    employmentType: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    responsibilities: "",
    displayOrder: 0
};

const ExperienceForm = ({
    initialData,
    onSubmit,
    onCancel,
    saving
}) => {
    const [form, setForm] = useState(emptyForm);

    useEffect(() => {
        if (initialData) {
            setForm({
                companyName: initialData.companyName ?? "",
                jobTitle: initialData.jobTitle ?? "",
                location: initialData.location ?? "",
                employmentType: initialData.employmentType ?? "",
                startDate: initialData.startDate ?? "",
                endDate: initialData.endDate ?? "",
                current: Boolean(initialData.current),
                description: initialData.description ?? "",
                responsibilities: initialData.responsibilities ?? "",
                displayOrder: initialData.displayOrder ?? 0
            });
        } else {
            setForm(emptyForm);
        }
    }, [initialData]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value,
            ...(name === "current" && checked ? { endDate: "" } : {})
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const payload = {
            ...form,
            location: form.location.trim() || null,
            employmentType: form.employmentType.trim() || null,
            description: form.description.trim() || null,
            responsibilities: form.responsibilities.trim() || null,
            endDate: form.current ? null : form.endDate || null,
            displayOrder: Number(form.displayOrder)
        };

        onSubmit(payload);
    };

    return (
        <form className="admin-experience-form" onSubmit={handleSubmit}>
            <div className="admin-experience-form-heading">
                <h3>{initialData ? "Edit Experience" : "Add Experience"}</h3>
                <p>
                    Enter the role details that should appear in your portfolio.
                </p>
            </div>

            <div className="admin-experience-form-grid">
                <div className="admin-experience-field">
                    <label htmlFor="companyName">Company name *</label>
                    <input
                        id="companyName"
                        name="companyName"
                        value={form.companyName}
                        onChange={handleChange}
                        maxLength={200}
                        required
                        disabled={saving}
                    />
                </div>

                <div className="admin-experience-field">
                    <label htmlFor="jobTitle">Job title *</label>
                    <input
                        id="jobTitle"
                        name="jobTitle"
                        value={form.jobTitle}
                        onChange={handleChange}
                        maxLength={200}
                        required
                        disabled={saving}
                    />
                </div>

                <div className="admin-experience-field">
                    <label htmlFor="location">Location</label>
                    <input
                        id="location"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        maxLength={200}
                        placeholder="e.g. Bengaluru, India"
                        disabled={saving}
                    />
                </div>

                <div className="admin-experience-field">
                    <label htmlFor="employmentType">Employment type</label>
                    <select
                        id="employmentType"
                        name="employmentType"
                        value={form.employmentType}
                        onChange={handleChange}
                        disabled={saving}
                    >
                        <option value="">Select employment type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Temporary">Temporary</option>
                    </select>
                </div>

                <div className="admin-experience-field">
                    <label htmlFor="startDate">Start date *</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={form.startDate}
                        onChange={handleChange}
                        required
                        disabled={saving}
                    />
                </div>

                <div className="admin-experience-field">
                    <label htmlFor="endDate">End date</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={form.endDate}
                        onChange={handleChange}
                        min={form.startDate || undefined}
                        disabled={saving || form.current}
                        required={!form.current}
                    />
                </div>

                <div className="admin-experience-field admin-experience-checkbox-field">
                    <label>
                        <input
                            type="checkbox"
                            name="current"
                            checked={form.current}
                            onChange={handleChange}
                            disabled={saving}
                        />
                        I currently work here
                    </label>
                </div>

                <div className="admin-experience-field">
                    <label htmlFor="displayOrder">Display order *</label>
                    <input
                        type="number"
                        id="displayOrder"
                        name="displayOrder"
                        min="0"
                        step="1"
                        value={form.displayOrder}
                        onChange={handleChange}
                        required
                        disabled={saving}
                    />
                    <small>Lower numbers generally appear first.</small>
                </div>

                <div className="admin-experience-field admin-experience-full-width">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        maxLength={2000}
                        rows={4}
                        placeholder="Briefly describe the role..."
                        disabled={saving}
                    />
                    <small>{form.description.length}/2000 characters</small>
                </div>

                <div className="admin-experience-field admin-experience-full-width">
                    <label htmlFor="responsibilities">Responsibilities</label>
                    <textarea
                        id="responsibilities"
                        name="responsibilities"
                        value={form.responsibilities}
                        onChange={handleChange}
                        maxLength={5000}
                        rows={6}
                        placeholder="Describe your responsibilities and achievements..."
                        disabled={saving}
                    />
                    <small>
                        {form.responsibilities.length}/5000 characters
                    </small>
                </div>
            </div>

            <div className="admin-experience-form-actions">
                <button
                    type="button"
                    className="admin-experience-cancel-button"
                    onClick={onCancel}
                    disabled={saving}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="admin-experience-save-button"
                    disabled={saving}
                >
                    {saving
                        ? "Saving..."
                        : initialData
                            ? "Update Experience"
                            : "Save Experience"}
                </button>
            </div>
        </form>
    );
};

export default ExperienceForm;
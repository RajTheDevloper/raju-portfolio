import { useEffect, useState } from "react";

const emptyForm = {
    fileName: "",
    fileUrl: "",
    fileType: "PDF",
    fileSize: "",
};

const ResumeForm = ({ initialData, onSubmit, onCancel, saving }) => {
    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState("");

    useEffect(() => {
        if (initialData) {
            setForm({
                fileName: initialData.fileName ?? "",
                fileUrl: initialData.fileUrl ?? "",
                fileType: initialData.fileType ?? "PDF",
                fileSize: initialData.fileSize ?? "",
            });
        } else {
            setForm(emptyForm);
        }

        setError("");
    }, [initialData]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        const fileName = form.fileName.trim();
        const fileUrl = form.fileUrl.trim();
        const fileType = form.fileType.trim();

        if (!fileName || !fileUrl) {
            setError("File name and file URL are required.");
            return;
        }

        if (!/^https?:\/\/.+/i.test(fileUrl)) {
            setError("Enter a valid URL beginning with http:// or https://.");
            return;
        }

        let parsedUrl;

        try {
            parsedUrl = new URL(fileUrl);
        } catch {
            setError("Enter a valid file URL.");
            return;
        }

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
            setError("Only HTTP and HTTPS URLs are supported.");
            return;
        }

        let fileSize;

        if (form.fileSize !== "" && form.fileSize !== null) {
            fileSize = Number(form.fileSize);

            if (!Number.isSafeInteger(fileSize) || fileSize < 0) {
                setError("File size must be a non-negative whole number in bytes.");
                return;
            }
        }

        const resumeData = {
            fileName,
            fileUrl,
            fileType: fileType || null,
            fileSize: fileSize ?? null,
        };

        try {
            await onSubmit(resumeData);
        } catch {
            // The parent page displays API errors.
        }
    };

    return (
        <form className="resume-form" onSubmit={handleSubmit}>
            <div className="resume-form-heading">
                <div>
                    <h2>{initialData ? "Edit resume details" : "Add a resume"}</h2>
                    <p>
                        Enter the details and URL of your existing resume file.
                    </p>
                </div>
            </div>

            {error && (
                <div className="resume-form-error" role="alert">
                    {error}
                </div>
            )}

            <div className="resume-form-grid">
                <div className="resume-field">
                    <label htmlFor="resume-fileName">File name *</label>
                    <input
                        id="resume-fileName"
                        name="fileName"
                        type="text"
                        maxLength={200}
                        value={form.fileName}
                        onChange={handleChange}
                        placeholder="Raju-B-Resume.pdf"
                        required
                    />
                </div>

                <div className="resume-field">
                    <label htmlFor="resume-fileType">File type</label>
                    <input
                        id="resume-fileType"
                        name="fileType"
                        type="text"
                        maxLength={50}
                        value={form.fileType}
                        onChange={handleChange}
                        placeholder="PDF"
                    />
                </div>

                <div className="resume-field resume-field-full">
                    <label htmlFor="resume-fileUrl">File URL *</label>
                    <input
                        id="resume-fileUrl"
                        name="fileUrl"
                        type="url"
                        maxLength={500}
                        value={form.fileUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/resume.pdf"
                        required
                    />
                    <small>
                        Use a URL that visitors can access. This form does not upload
                        files to the server.
                    </small>
                </div>

                <div className="resume-field">
                    <label htmlFor="resume-fileSize">File size (bytes)</label>
                    <input
                        id="resume-fileSize"
                        name="fileSize"
                        type="number"
                        min="0"
                        step="1"
                        value={form.fileSize}
                        onChange={handleChange}
                        placeholder="Optional"
                    />
                </div>
            </div>

            <div className="resume-form-actions">
                <button
                    type="button"
                    className="resume-button resume-button-secondary"
                    onClick={onCancel}
                    disabled={saving}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="resume-button resume-button-primary"
                    disabled={saving}
                >
                    {saving
                        ? "Saving..."
                        : initialData
                            ? "Save changes"
                            : "Add resume"}
                </button>
            </div>
        </form>
    );
};

export default ResumeForm;
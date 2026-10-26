
import { useEffect, useState } from "react";

const emptyForm = {
  institutionName: "",
  degree: "",
  fieldOfStudy: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
  displayOrder: 0,
};

const EducationForm = ({
  initialData,
  onSubmit,
  onCancel,
  saving,
}) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        institutionName: initialData.institutionName ?? "",
        degree: initialData.degree ?? "",
        fieldOfStudy: initialData.fieldOfStudy ?? "",
        location: initialData.location ?? "",
        startDate: initialData.startDate ?? "",
        endDate: initialData.endDate ?? "",
        current: initialData.current ?? false,
        description: initialData.description ?? "",
        displayOrder: initialData.displayOrder ?? 0,
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? Number(value)
            : value,
      ...(name === "current" && checked ? { endDate: "" } : {}),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.current && form.endDate && form.startDate &&
        form.endDate < form.startDate) {
      return;
    }

    onSubmit({
      ...form,
      institutionName: form.institutionName.trim(),
      degree: form.degree.trim(),
      fieldOfStudy: form.fieldOfStudy.trim(),
      location: form.location.trim(),
      description: form.description.trim(),
      endDate: form.current || !form.endDate ? null : form.endDate,
    });
  };

  const invalidDateRange =
    !form.current &&
    form.startDate &&
    form.endDate &&
    form.endDate < form.startDate;

  return (
    <form className="education-form" onSubmit={handleSubmit}>
      <div className="education-form-heading">
        <div>
          <h2>{initialData ? "Edit education" : "Add education"}</h2>
          <p>
            Keep your academic qualifications and education timeline up to date.
          </p>
        </div>
      </div>

      <div className="education-form-grid">
        <div className="education-field">
          <label htmlFor="education-institution">
            Institution name *
          </label>
          <input
            id="education-institution"
            name="institutionName"
            value={form.institutionName}
            onChange={handleChange}
            maxLength={200}
            required
            placeholder="e.g. ABC University"
          />
        </div>

        <div className="education-field">
          <label htmlFor="education-degree">Degree / qualification *</label>
          <input
            id="education-degree"
            name="degree"
            value={form.degree}
            onChange={handleChange}
            maxLength={200}
            required
            placeholder="e.g. Bachelor of Engineering"
          />
        </div>

        <div className="education-field">
          <label htmlFor="education-field-of-study">Field of study</label>
          <input
            id="education-field-of-study"
            name="fieldOfStudy"
            value={form.fieldOfStudy}
            onChange={handleChange}
            maxLength={200}
            placeholder="e.g. Computer Science"
          />
        </div>

        <div className="education-field">
          <label htmlFor="education-location">Location</label>
          <input
            id="education-location"
            name="location"
            value={form.location}
            onChange={handleChange}
            maxLength={200}
            placeholder="e.g. Bengaluru, India"
          />
        </div>

        <div className="education-field">
          <label htmlFor="education-start-date">Start date *</label>
          <input
            id="education-start-date"
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="education-field">
          <label htmlFor="education-end-date">End date</label>
          <input
            id="education-end-date"
            name="endDate"
            type="date"
            value={form.endDate}
            onChange={handleChange}
            disabled={form.current}
            min={form.startDate || undefined}
          />
        </div>

        <div className="education-field education-field-full">
          <label className="education-current-checkbox">
            <input
              type="checkbox"
              name="current"
              checked={form.current}
              onChange={handleChange}
            />
            <span>I am currently studying here</span>
          </label>
        </div>

        <div className="education-field">
          <label htmlFor="education-display-order">Display order *</label>
          <input
            id="education-display-order"
            name="displayOrder"
            type="number"
            value={form.displayOrder}
            onChange={handleChange}
            min="0"
            required
          />
          <small>Smaller numbers appear first.</small>
        </div>

        <div className="education-field education-field-full">
          <label htmlFor="education-description">Description</label>
          <textarea
            id="education-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            maxLength={2000}
            rows={4}
            placeholder="Relevant coursework, achievements, or activities..."
          />
          <small>{form.description.length}/2000 characters</small>
        </div>
      </div>

      {invalidDateRange && (
        <p className="education-validation-error" role="alert">
          The end date cannot be earlier than the start date.
        </p>
      )}

      <div className="education-form-actions">
        <button
          type="button"
          className="education-button education-button-secondary"
          onClick={onCancel}
          disabled={saving}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="education-button education-button-primary"
          disabled={saving || Boolean(invalidDateRange)}
        >
          {saving
            ? "Saving..."
            : initialData
              ? "Save changes"
              : "Create education"}
        </button>
      </div>
    </form>
  );
};

export default EducationForm;

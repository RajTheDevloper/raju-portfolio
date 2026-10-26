
import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  slug: "",
  category: "",
  proficiency: "Intermediate",
  yearsOfExperience: 0,
  description: "",
  featured: false,
  displayOrder: 0,
};

const SkillForm = ({
  initialData,
  onSubmit,
  onCancel,
  saving,
}) => {
  const [form, setForm] = useState(emptyForm);
  const [slugManuallyEdited, setSlugManuallyEdited] =
    useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name ?? "",
        slug: initialData.slug ?? "",
        category: initialData.category ?? "",
        proficiency: initialData.proficiency ?? "Intermediate",
        yearsOfExperience: initialData.yearsOfExperience ?? 0,
        description: initialData.description ?? "",
        featured: initialData.featured ?? false,
        displayOrder: initialData.displayOrder ?? 0,
      });
      setSlugManuallyEdited(true);
    } else {
      setForm(emptyForm);
      setSlugManuallyEdited(false);
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => {
      const updated = {
        ...previous,
        [name]:
          type === "checkbox"
            ? checked
            : type === "number"
              ? Number(value)
              : value,
      };

      if (name === "name" && !slugManuallyEdited) {
        updated.slug = value
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
      }

      return updated;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      ...form,
      name: form.name.trim(),
      slug: form.slug.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
    });
  };

  return (
    <form className="skill-form" onSubmit={handleSubmit}>
      <div className="skill-form-heading">
        <div>
          <h2>{initialData ? "Edit skill" : "Add a skill"}</h2>
          <p>
            Add your technical skills and organize them for your
            portfolio.
          </p>
        </div>
      </div>

      <div className="skill-form-grid">
        <div className="skill-field">
          <label htmlFor="skill-name">Skill name *</label>
          <input
            id="skill-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            maxLength={100}
            required
            placeholder="e.g. Java"
          />
        </div>

        <div className="skill-field">
          <label htmlFor="skill-slug">Slug *</label>
          <input
            id="skill-slug"
            name="slug"
            value={form.slug}
            onChange={(event) => {
              setSlugManuallyEdited(true);
              handleChange(event);
            }}
            maxLength={100}
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            title="Use lowercase letters, numbers, and single hyphens."
            required
            placeholder="e.g. java"
          />
          <small>Lowercase letters, numbers, and hyphens only.</small>
        </div>

        <div className="skill-field">
          <label htmlFor="skill-category">Category *</label>
          <input
            id="skill-category"
            name="category"
            value={form.category}
            onChange={handleChange}
            maxLength={100}
            required
            placeholder="e.g. Backend Development"
          />
        </div>

        <div className="skill-field">
          <label htmlFor="skill-proficiency">Proficiency *</label>
          <select
            id="skill-proficiency"
            name="proficiency"
            value={form.proficiency}
            onChange={handleChange}
            required
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        <div className="skill-field">
          <label htmlFor="skill-years">Years of experience *</label>
          <input
            id="skill-years"
            name="yearsOfExperience"
            type="number"
            min="0"
            max="50"
            value={form.yearsOfExperience}
            onChange={handleChange}
            required
          />
        </div>

        <div className="skill-field">
          <label htmlFor="skill-order">Display order *</label>
          <input
            id="skill-order"
            name="displayOrder"
            type="number"
            min="0"
            value={form.displayOrder}
            onChange={handleChange}
            required
          />
          <small>Smaller numbers appear first.</small>
        </div>

        <div className="skill-field skill-field-full">
          <label htmlFor="skill-description">Description</label>
          <textarea
            id="skill-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            maxLength={1000}
            rows={4}
            placeholder="Describe how you use this skill..."
          />
          <small>{form.description.length}/1000 characters</small>
        </div>

        <div className="skill-field skill-field-full">
          <label className="skill-featured-checkbox">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />
            <span>Feature this skill on my portfolio</span>
          </label>
        </div>
      </div>

      <div className="skill-form-actions">
        <button
          type="button"
          className="skill-button skill-button-secondary"
          onClick={onCancel}
          disabled={saving}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="skill-button skill-button-primary"
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : initialData
              ? "Save changes"
              : "Create skill"}
        </button>
      </div>
    </form>
  );
};

export default SkillForm;

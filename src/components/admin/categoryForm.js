export default function CategoryForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  loading,
  error,
}) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({
      ...formData,
      image: file,
    });
  };

  return (
    <div className="form-overlay">
      <form className="category-form" onSubmit={onSubmit}>
        <h2>Add New Category</h2>

        {error && (
          <p style={{ color: "red" }}>
            {JSON.stringify(Object.values(error)[0])}
          </p>
        )}

        <input
          type="text"
          placeholder="Category Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        <div className="form-actions">
          <button type="submit" disabled={loading}>Add</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

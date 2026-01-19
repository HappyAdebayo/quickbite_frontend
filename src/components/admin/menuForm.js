export default function MenuForm({ formData, setFormData, categories, onSubmit, onCancel, editing, loading,error }) {
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
      <form className="menu-form" onSubmit={onSubmit}>
        <h2>{editing ? "Edit Menu" : "Add New Menu"}</h2>
      {error && <p style={{ color: "red" }}>{JSON.stringify(Object.values(error)[0])}</p>}

        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />

        <select
          value={formData.categoryId}
          onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        <div className="form-actions">
          <button type="submit" disabled={loading}>{editing ? "Save" : "Add"}</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

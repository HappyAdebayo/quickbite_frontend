export default function CategoryForm({ categoryName, setCategoryName, onSubmit, onCancel,error }) {
  return (
    <div className="form-overlay">
      <form className="category-form" onSubmit={onSubmit}>
        <h2>Add New Category</h2>
      {error && <p style={{ color: "red" }}>{JSON.stringify(error)}</p>}

        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
        <div className="form-actions">
          <button type="submit">Add</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

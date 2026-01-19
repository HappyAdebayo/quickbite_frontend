import { useState, useEffect } from "react";
import CategoryForm from "../../components/admin/categoryForm";
import { useApi } from "../../hooks/useApi";
import { capitalizeFirstLetter } from "../../utils/stringUtils";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const { request, loading } = useApi();
  const [showForm, setShowForm] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [error, setError]= useState()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await request("get", "/admin/categories");
        setCategories(data.categories);
        
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);


  const addCategory = async (e) => {
      e.preventDefault();
      if (!newCategory.trim()) return;
  
      try {
        const data = await request("post", "/admin/categories", {
          name: newCategory.trim().toLowerCase(),
        });
  
        setCategories([...categories, data.category]);
        setNewCategory("");
        setShowForm(false);
      } catch (err) {
        console.error("Failed to add category:", err);
        // alert(
        //   err.errors
        //     ? Object.values(err.errors).flat().join(", ")
        //     : err.message || "Failed to add category"
        // );

        if (err.response && err.response.status === 422) {
          const errors = err.response.data.errors;
          const messages = Object.values(errors).flat().join("\n"); 
          setError(messages);
        } else {
          console.error("Failed to save menu:", err);
          setError("Failed to save menu. See console for details.");
        }
      }
    };
  
    const deleteCategory = async (id) => {
      try {
        await request("delete", `/admin/categories/${id}`);
        setCategories(categories.filter((cat) => cat.id !== id));
      } catch (err) {
        console.error("Failed to delete category:", err);
        alert(err.message || "Failed to delete category");
      }
    };

  return (
    <div className="categories-page">
      <div className="categories-header">
        <h1>Categories</h1>
        <button className="add-btn" onClick={() => setShowForm(true)}>Add Category</button>
      </div>

      {showForm && (
        <CategoryForm
          categoryName={newCategory}
          setCategoryName={setNewCategory}
          onSubmit={addCategory}
          onCancel={() => setShowForm(false)}
          error={error}
        />
      )}

      <div className="categories-grid">
        {categories.map((cat) => (
          <div className="category-card" key={cat.id}>
            <h3>{capitalizeFirstLetter(cat.name)}</h3>
            <button className="delete-btn" onClick={() => deleteCategory(cat.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* CSS remains the same as before */}
      <style>{`
        .categories-page { padding: 16px; }
        .categories-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .categories-header h1 { font-size: 24px; font-weight: 700; }
        .add-btn {
          background-color: #ed1212;
          color: #fff;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        }
        .add-btn:hover { background-color: #c11212; }

        .categories-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }

        .category-card {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 12px;
          padding: 16px;
          width: 180px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        }

        .delete-btn {
          background-color: #ef4444;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 4px 8px;
          cursor: pointer;
          font-size: 12px;
        }
        .delete-btn:hover { opacity: 0.9; }

        .form-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 100;
        }

        .category-form {
          background: #fff;
          padding: 24px;
          border-radius: 12px;
          width: 320px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .category-form h2 {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
          color: #ed1212;
        }
        .category-form input {
          padding: 8px 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
        }
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }
        .form-actions button {
          padding: 8px 12px;
          border-radius: 6px;
          border: none;
          font-weight: 600;
          cursor: pointer;
        }
        .form-actions button[type="submit"] { background-color: #10b981; color: #fff; }
        .form-actions button[type="button"] { background-color: #ef4444; color: #fff; }
      `}</style>
    </div>
  );
}

import { useState,useEffect } from "react";
import MenuForm from "../../components/admin/menuForm";
import MenuCard from "../../components/menuCard";
import { FilterButton } from "../../components/filterButton";
import { useApi } from "../../hooks/useApi";

export default function MenuPage() {
  const {request,loading}=useApi();
  const [error, setError]=useState();
  const [categories,setCategories] = useState([]);

  const [menuItems, setMenuItems] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", price: "", image: null, categoryId: "" });
  const [currentFilter, setCurrentFilter] = useState("All"); // default show all

    useEffect(() => {
       const fetchData = async () => {
        try {
          const catData = await request("get", "/admin/categories");
          setCategories(catData.categories);

          const menuData = await request("get", "/admin/menus");
          setMenuItems(menuData);
        } catch (err) {
          console.error("Failed to fetch menu or categories:", err);
        }
      };

      fetchData();
    }, []);

    const toggleAvailability = async (item) => {
      try {
        const data = await request("put", `/admin/menus/${item}/availability`);
        setMenuItems(menuItems.map(m => m.id === item ? data.menu : m));
      } catch (err) {
        console.error("Failed to update availability:", err);
      }
    };

  const deleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this menu?")) return;

    try {
      await request("delete", `/admin/menus/${id}`);
      setMenuItems(menuItems.filter(item => item.id !== id));
    } catch (err) {
      console.error("Failed to delete menu:", err);
    }
  };

  const openAddForm = () => {
    setEditingItem(null);
    setFormData({ name: "", description: "", price: "", image: null, categoryId: "" });
    setShowForm(true);
  };

  const openEditForm = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      categoryId: item.categoryId,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.price || !formData.categoryId) {
    return alert("Please fill all required fields");
  }

  try {
    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description || "");
    form.append("price", formData.price);
    form.append("category_id", formData.categoryId);
    form.append("status", "available");

    if (formData.image instanceof File) {
      form.append("image", formData.image);
    }

    let data;

    if (editingItem) {
      form.append("_method", "PUT");

      data = await request( "post", `/admin/menus/${editingItem.id}`, form);

      setMenuItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id ? data.menu : item
        )
      );
    } else {
      data = await request("post", "/admin/menus", form);

      setMenuItems((prev) => [...prev, data.menu]);
    }

    setShowForm(false);
    setEditingItem(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      image: null,
      categoryId: "",
    });
  } catch (err) {
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

  const filteredItems = currentFilter === "All" ? menuItems : menuItems.filter(item => item.categoryId === categories.find(cat => cat.name === currentFilter)?.id);

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Menu</h1>
        <button className="add-btn" onClick={openAddForm}>Add Menu</button>
      </div>

      <FilterButton
        options={["All", ...categories.map(c => c.name)]}
        currentFilter={currentFilter}
        onChange={setCurrentFilter}
      />

     {showForm && (
        <MenuForm
            formData={formData}
            setFormData={setFormData}
            categories={categories}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
            editing={editingItem !== null}
            loading={loading}
            error={error}
        />
        )}


      <div className="menu-grid">
        {filteredItems.length === 0 && <p style={{marginTop:'20px'}}>Click to Button Above to Add Product to Menu </p>}
        {filteredItems.map(item => (
          <MenuCard
            key={item.id}
            item={item}
            onToggle={() => toggleAvailability(item.id)}
            onEdit={() => openEditForm(item)}
            onDelete={() => deleteItem(item.id)}
          />
        ))}
      </div>

      <style>{`
        .menu-page { padding: 16px; }
        .menu-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .menu-header h1 { font-size: 24px; font-weight: 700; }
        .add-btn { background-color: #ed1212; color: #fff; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; }
        .add-btn:hover { background-color: #c11212; }
        .menu-grid { display: flex; flex-wrap: wrap; gap: 20px; margin-top: 12px; justify-content:center }
        .form-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 100; }
        .menu-form { background: #fff; padding: 24px; border-radius: 12px; width: 320px; display: flex; flex-direction: column; gap: 12px; }
        .menu-form h2 { margin: 0; font-size: 20px; font-weight: 700; margin-bottom: 12px; }
        .menu-form input, .menu-form select { padding: 8px 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px; }
        .form-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 12px; }
        .form-actions button { padding: 8px 12px; border-radius: 6px; border: none; font-weight: 600; cursor: pointer; }
        .form-actions button[type="submit"] { background-color: #10b981; color: #fff; }
        .form-actions button[type="button"] { background-color: #ef4444; color: #fff; }
        .form-actions button:hover { opacity: 0.9; }
      `}</style>
    </div>
  );
}

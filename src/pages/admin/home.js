import { useState } from "react";
import { FilterButton } from "../../components/filterButton";
import AdminSidebar from "../../components/admin/adminSidebar";
function AdminApp() {
  const [activeTab, setActiveTab] = useState("Orders");

  const [orders, setOrders] = useState([
    {
      id: 101,
      items: [
        { id: 1, name: "Cheese Burger", price: 2500, quantity: 2 },
        { id: 2, name: "Double Burger", price: 3000, quantity: 1 },
      ],
      status: "processing",
    },
    {
      id: 102,
      items: [
        { id: 3, name: "French Fries", price: 1200, quantity: 3 },
      ],
      status: "processing",
    },
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: "Cheese Burger", price: 2500, type: "Burger" },
    { id: 2, name: "Double Burger", price: 3000, type: "Burger" },
    { id: 3, name: "French Fries", price: 1200, type: "Fries" },
    { id: 4, name: "Pepperoni Pizza", price: 3500, type: "Pizza" },
  ]);

  const updateStatus = (orderId) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, status: order.status === "processing" ? "completed" : "processing" }
          : order
      )
    );
  };

  const [newProduct, setNewProduct] = useState({ name: "", price: "", type: "" });

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.type) return;

    setProducts([
      ...products,
      { id: products.length + 1, name: newProduct.name, price: parseInt(newProduct.price), type: newProduct.type },
    ]);

    setNewProduct({ name: "", price: "", type: "" });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Admin Dashboard</h1>

      {/* Tabs using FilterButton */}
      <FilterButton
        options={["Orders", "Products"]}
        currentFilter={activeTab}
        onChange={setActiveTab}
      />

      {/* Orders Tab */}
      {activeTab === "Orders" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "20px" }}>
          {orders.length === 0 && <p style={{ textAlign: "center" }}>No orders yet.</p>}

          {orders.map((order) => {
            const totalPrice = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);

            return (
              <div
                key={order.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "16px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3>Order ID: {order.id}</h3>
                  <button
                    onClick={() => updateStatus(order.id)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: order.status === "completed" ? "#ccc" : "#28a745",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: order.status === "completed" ? "not-allowed" : "pointer",
                    }}
                  >
                    {order.status === "completed" ? "Completed" : "Mark as Completed"}
                  </button>
                </div>

                <div style={{ marginTop: "12px" }}>
                  <ul style={{ paddingLeft: "20px" }}>
                    {order.items.map((item) => (
                      <li key={item.id} style={{ marginBottom: "6px" }}>
                        {item.name} - ₦{item.price} x {item.quantity} = ₦{item.price * item.quantity}
                      </li>
                    ))}
                  </ul>
                  <p style={{ fontWeight: "600" }}>
                    Total Quantity: {totalQuantity} | Total Price: ₦{totalPrice}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Products Tab */}
      {activeTab === "Products" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "20px" }}>
          <h2>Add New Product</h2>
          <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              style={{ padding: "8px", flex: 1 }}
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              style={{ padding: "8px", width: "120px" }}
            />
            <input
              type="text"
              placeholder="Type (Burger, Pizza, Fries)"
              value={newProduct.type}
              onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
              style={{ padding: "8px", width: "150px" }}
            />
            <button
              onClick={addProduct}
              style={{
                padding: "8px 16px",
                backgroundColor: "#ed1212",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Add
            </button>
          </div>

          <h2>All Products</h2>
          <ul>
            {products.map((p) => (
              <li key={p.id} style={{ marginBottom: "6px" }}>
                {p.name} - ₦{p.price} ({p.type})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AdminApp;

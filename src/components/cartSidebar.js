// src/components/CartSidebar.js
export function CartSidebar({ cart, onQuantityChange, onRemove, onPlaceOrder, orderPlaced, onClose }) {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    console.log(cart,'cart');

  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        width: "360px",
        height: "100%",
        backgroundColor: "#fff",
        boxShadow: "-4px 0 12px rgba(0,0,0,0.15)",
        padding: "20px",
        zIndex: 1000,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header with Close Button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0, textAlign: "center", flex: 1 }}>🛒 My Order</h2>
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: "#666",
            marginLeft: "8px",
          }}
          title="Close"
        >
          ×
        </button>
      </div>

      {cart.length === 0 && <p style={{ textAlign: "center", color: "#666" }}>No items added yet.</p>}

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 0",
            borderBottom: "1px solid #eee",
          }}
        >
          {/* Product Image */}
          <img
            src={`http://localhost:8000/storage/${item.image}`}
            alt={item.name}
            style={{
              width: "60px",
              height: "60px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />

          {/* Product Info */}
          <div style={{ flex: 1 }}>
            <strong style={{ display: "block", fontSize: "16px", marginBottom: "4px" }}>
              {item.name}
            </strong>
            <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
              ₦{item.price} x {item.quantity} = ₦{item.price * item.quantity}
            </p>
          </div>

          {/* Quantity Controls */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-end" }}>
            <div style={{ display: "flex", gap: "4px" }}>
              <button
                onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                disabled={orderPlaced || item.quantity <= 1}
                style={qtyBtnStyle}
              >
                −
              </button>
              <span style={{ fontWeight: "600", minWidth: "20px", textAlign: "center" }}>{item.quantity}</span>
              <button
                onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                disabled={orderPlaced}
                style={qtyBtnStyle}
              >
                +
              </button>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              disabled={orderPlaced}
              style={removeBtnStyle}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Total and Place Order */}
      {cart.length > 0 && (
        <div style={{ marginTop: "auto" }}>
          <p style={{ fontWeight: "600", fontSize: "16px", margin: "8px 0" }}>
            Total Quantity: {totalQuantity}
          </p>
          <p style={{ fontWeight: "600", fontSize: "16px", margin: "8px 0" }}>
            Total Price: ₦{totalPrice}
          </p>
          <button
            onClick={onPlaceOrder}
            disabled={orderPlaced}
            style={{
              padding: "10px 16px",
              width: "100%",
              backgroundColor: orderPlaced ? "#ccc" : "#ed1212",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: orderPlaced ? "not-allowed" : "pointer",
              fontWeight: "600",
              fontSize: "16px",
            }}
          >
            {orderPlaced ? "Order Placed" : "Place Order"}
          </button>
        </div>
      )}
    </div>
  );
}

const qtyBtnStyle = {
  width: "28px",
  height: "28px",
  borderRadius: "50%",
  border: "1px solid #ddd",
  backgroundColor: "#fff",
  cursor: "pointer",
  fontSize: "16px",
};

const removeBtnStyle = {
  padding: "2px 6px",
  fontSize: "12px",
  backgroundColor: "#f44336",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

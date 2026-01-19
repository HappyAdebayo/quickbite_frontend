import { useState } from "react";

export function ProductCard({ image, name, description, price, disabled, onAdd }) {
  const [quantity, setQuantity] = useState(0);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 0 ? q - 1 : 0));

  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: "12px",
        width: "260px",
        padding: "12px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
        backgroundColor: "#fff",
      }}
    >
      <img
        src={`http://localhost:8000/storage/${image}`}
        alt={name}
        style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "8px" }}
      />

      <div style={{ marginTop: "10px" }}>
        <h3 style={{ margin: "6px 0" }}>{name}</h3>
        <p style={{ fontSize: "14px", color: "#666", margin: "4px 0 8px" }}>{description}</p>
        <strong style={{ fontSize: "16px", color: "#ed1212" }}>₦{price}</strong>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={decrement}
              style={btnStyle}
              disabled={disabled}
            >
              −
            </button>

            <span style={{ fontWeight: "600" }}>{quantity}</span>

            <button
              onClick={increment}
              style={btnStyle}
              disabled={disabled}
            >
              +
            </button>
          </div>

          <button
            style={{
              ...addBtnStyle,
              opacity: disabled || quantity === 0 ? 0.5 : 1,
              cursor: disabled || quantity === 0 ? "not-allowed" : "pointer",
            }}
            onClick={() => onAdd(quantity)}
            disabled={disabled || quantity === 0} 
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

const btnStyle = {
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  border: "1px solid #ddd",
  backgroundColor: "#fff",
  cursor: "pointer",
  fontSize: "18px",
};

const addBtnStyle = {
  backgroundColor: "#ed1212",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  fontWeight: "600",
};

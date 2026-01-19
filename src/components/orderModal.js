// src/components/OrderModal.js
export function OrderModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.6)", // slightly darker overlay
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "10px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px 25px",
          borderRadius: "16px",
          width: "320px",
          maxWidth: "90%",
          textAlign: "center",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)", // nicer shadow
          animation: "fadeIn 0.3s ease-out", // subtle pop-in effect
        }}
      >
        <h2 style={{ color: "#ed1212", marginBottom: "12px" }}>🎉 Order Placed!</h2>
        <p style={{ margin: "8px 0", fontSize: "16px" }}>
          Your order ID is <strong>{order.order_id}</strong>
        </p>
        <p style={{ margin: "8px 0", fontSize: "16px" }}>
          Status: <strong>{order.status}</strong>
        </p>
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#ed1212",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "16px",
            transition: "background-color 0.2s ease",
          }}
          onClick={onClose}
          onMouseOver={e => e.currentTarget.style.backgroundColor = "#d10f0f"}
          onMouseOut={e => e.currentTarget.style.backgroundColor = "#ed1212"}
        >
          Close
        </button>
      </div>

      {/* Optional: Add keyframes animation in CSS for fadeIn */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}

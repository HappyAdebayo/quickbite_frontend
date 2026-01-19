export function Header({ onCartClick, cartQuantity }) {
  return (
    <header
      style={{
        backgroundColor: "#ed1212",
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "24px" }}>🍔</span>
        <h1
          style={{
            margin: 0,
            color: "white",
            fontSize: '24px',
            fontWeight: '700',
            fontSize:'25px',
            letterSpacing: "0.5px",
          }}
        >
          QuickBite
        </h1>
      </div>

      {/* Cart Icon with Badge */}
      <div
        onClick={onCartClick}
        style={{
          fontSize: "24px",
          cursor: "pointer",
          color: "white",
          position: "relative",
        }}
      >
        🛒
        {cartQuantity > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-6px",
              right: "-6px",
              backgroundColor: "#fff",
              color: "#ed1212",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "12px",
              fontWeight: "600",
              minWidth: "20px",
              textAlign: "center",
            }}
          >
            {cartQuantity}
          </span>
        )}
      </div>
    </header>
  );
}

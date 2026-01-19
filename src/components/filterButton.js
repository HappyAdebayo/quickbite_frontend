import { useRef, useState, useEffect } from "react";

export function FilterButton({ options, currentFilter, onChange }) {
  const containerRef = useRef();
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  // Check scroll to toggle arrows
  const checkScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    setShowLeft(container.scrollLeft > 0);
    setShowRight(container.scrollLeft + container.clientWidth < container.scrollWidth);
  };

  useEffect(() => {
    checkScroll();
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;
    const scrollAmount = 120;
    container.scrollBy({ left: direction === "right" ? scrollAmount : -scrollAmount, behavior: "smooth" });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", marginTop: "12px" }}>
      {/* Left arrow */}
      {showLeft && (
        <button
          onClick={() => scroll("left")}
          style={{
            cursor: "pointer",
            fontSize: "20px",
            background: "none",
            border: "none",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          &lt;
        </button>
      )}

      {/* Scrollable container */}
      <div
        ref={containerRef}
        style={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
          scrollbarWidth: "none",
          flexWrap: "nowrap",
          justifyContent: "center",
        }}
      >
        {options.map((type) => (
          <button
            key={type}
            onClick={() => onChange(type)}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: currentFilter === type ? "2px solid #ed1212" : "1px solid #ccc",
              backgroundColor: currentFilter === type ? "#ed1212" : "#fff",
              color: currentFilter === type ? "#fff" : "#000",
              cursor: "pointer",
              fontWeight: "600",
              whiteSpace: "nowrap",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Right arrow */}
      {showRight && (
        <button
          onClick={() => scroll("right")}
          style={{
            cursor: "pointer",
            fontSize: "20px",
            background: "none",
            border: "none",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          &gt;
        </button>
      )}

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

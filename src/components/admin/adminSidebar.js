import { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/admin" },
  { name: "Menu", path: "/admin/menu" },
  { name: "Categories", path: "/admin/categories" },
  { name: "Orders", path: "/admin/orders" },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger button for small screens */}
      {!isOpen && (
        <button
          className="sidebar-toggle"
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button>
      )}

      <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
        {/* Close button inside sidebar */}
        {isOpen && (
          <button
            className="sidebar-close"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        )}

        {/* Logo */}
        <div className="sidebar-header">
          <h1 className="brand">Quick Bite</h1>
          <p className="subtitle">Admin Panel</p>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={() => setIsOpen(false)} // close sidebar on link click
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          © {new Date().getFullYear()} Quick Bite
        </div>
      </aside>

      <style>{`
        /* Sidebar base styles for large screens (normal layout) */
        .admin-sidebar {
          width: 260px;
          height: 100vh;
          background-color: #ffffff;
          border-right: 1px solid #e5e5e5;
          display: flex;
          flex-direction: column;
          position: relative; /* not fixed on large screens */
        }

        .sidebar-header {
          padding: 24px;
          border-bottom: 1px solid #e5e5e5;
        }

        .brand {
          font-size: 24px;
          font-weight: 700;
          color: #ed1212;
          margin: 0;
        }

        .subtitle {
          font-size: 14px;
          color: #777;
          margin-top: 4px;
        }

        .sidebar-nav {
          flex: 1;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .nav-link {
          padding: 12px 16px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 500;
          color: #333;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .nav-link:hover {
          background-color: rgba(237, 18, 18, 0.08);
        }

        .nav-link.active {
          background-color: #ed1212;
          color: #ffffff;
        }

        .sidebar-footer {
          padding: 16px;
          border-top: 1px solid #e5e5e5;
          font-size: 13px;
          color: #777;
          text-align: center;
        }

        /* Toggle button (hamburger) */
        .sidebar-toggle {
          display: none;
          position: fixed;
          top: 16px;
          left: 16px;
          font-size: 20px;
          background-color: rgba(237, 18, 18, 0.7);
          padding: 5px 10px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          z-index: 1100;
        }

        /* Close button inside sidebar */
        .sidebar-close {
          display: none;
        }

        /* Responsive styles for small screens */
        @media (max-width: 768px) {
          .admin-sidebar {
            position: fixed; /* now overlay */
            top: 0;
            left: 0;
            transform: translateX(-100%);
            width: 220px;
            height: 100vh;
            z-index: 1000;
            box-shadow: 2px 0 12px rgba(0,0,0,0.2);
            transition: transform 0.3s ease;
          }

          .admin-sidebar.open {
            transform: translateX(0);
          }

          .sidebar-toggle {
            display: block;
          }

          .sidebar-close {
            display: block;
            position: absolute;
            top: 16px;
            right: 16px;
            font-size: 24px;
            background: none;
            border: none;
            cursor: pointer;
          }
        }
      `}</style>
    </>
  );
}

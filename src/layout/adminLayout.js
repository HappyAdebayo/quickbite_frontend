import { Outlet, Navigate } from "react-router-dom";
import AdminSidebar from "../components/admin/adminSidebar";

export default function AdminLayout() {
    const isAdmin = localStorage.getItem("adminLoggedIn") === "true";

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <Outlet />
      </main>

      <style>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background-color: #f9f9f9; /* light background for main area */
        }

        .admin-main {
          flex: 1;            /* take remaining space */
          padding: 24px; 
          height:100vh;     /* padding around content */
          overflow-y: auto;   /* scroll if content is long */
        }
      `}</style>
    </div>
  );
}

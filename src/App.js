import { BrowserRouter,Route,Routes } from "react-router-dom";
import UserApp from "./pages/user/home";
import AdminLayout from "./layout/adminLayout";
import AdminDashboard from "./pages/admin/adminDashboard";
import MenuPage from "./pages/admin/menu";
import OrdersPage from "./pages/admin/order";
import LoginPage from "./pages/admin/login";
import CategoriesPage from "./pages/admin/categories";
import SignupPage from "./pages/admin/signup";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserApp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<AdminLayout />}>
           <Route index element={<AdminDashboard />} />
           <Route path="menu" element={<MenuPage />} />
           <Route path="orders" element={<OrdersPage />} />
           <Route path="categories" element={<CategoriesPage />} />
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
import { Header } from "../../components/header";
import { ProductCard } from "../../components/productCard";
import { FilterButton } from "../../components/filterButton";
import { OrderModal } from "../../components/orderModal";
import { CartSidebar } from "../../components/cartSidebar";
import { useState,useEffect } from "react";
import { useApi } from "../../hooks/useApi";

function UserApp() {

  const { request } = useApi();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [filter, setFilter] = useState("All");
  const [cart, setCart] = useState([]);
  const [menus, setMenus] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [toast, setToast] = useState({ message: "", visible: false });


  const [categories, setCategories] = useState([]);

  useEffect(() => {
    request('get', '/user/categories')
      .then(data => setCategories(data.categories))
      .catch(err => console.error(err));

    request('get', '/user/menus')
      .then(data => setMenus(data.menus))
      .catch(err => console.error(err));
  }, []);


  const displayedProducts = filter === "All" ? menus : menus.filter(product => product.type === filter);

  const addToCart = (product, qty) => {
    if (qty <= 0) return;

    const exists = cart.find(item => item.id === product.id);

    if (exists) {
      setCart(prev =>
        prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
      );
    } else {
      setCart(prev => [...prev, { ...product, quantity: qty }]);
    }

    setToast({ message: `${product.name} added to cart`, visible: true });

    setTimeout(() => {
      setToast(t => ({ ...t, visible: false }));
    }, 2500);
  };


  const updateQuantity = (id, qty) => {
    if (qty <= 0) return;
    setCart(cart.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const placeOrder = async() => {
    if (cart.length === 0) return;

    const orderPayload = cart.map(item => ({
      menu_id: item.id,
      quantity: item.quantity,
    }));

    try {
      const data = await request('post', '/user/orders', { cart:orderPayload });
      setCurrentOrder(data);
      setModalVisible(true);
      setCart([]); 
    } catch (err) {
      console.error(err);
      alert('Failed to place order');
    }
  };


  useEffect(() => {
  if (!currentOrder) return;

  const interval = setInterval(async () => {
    try {
      const data = await request("get", `/user/orders/${currentOrder.order_id}`);

      if (data.order.status === "completed") {
        
        setModalVisible(false);
        setCurrentOrder(null);
        setCart([]);
      }
    } catch (err) {
      console.error("Order polling failed:", err);
    }
  }, 5000);

  return () => clearInterval(interval);
}, [currentOrder]);


  return (
    <div className="App">
      <Header 
      onCartClick={() => setSidebarVisible(!sidebarVisible)} 
      cartQuantity={cart.reduce((sum, item) => sum + item.quantity, 0)}
      />

      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <h2>Welcome to QuickBite!</h2>
        <p>Select your favorite fast food below and add to your cart.</p>

        <FilterButton
          options={categories}
          currentFilter={filter}
          onChange={setFilter}
        />
      </div>

      <div className="product-grid">
        {displayedProducts.map(product => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            description={product.description}
            price={product.price}
            disabled={!!currentOrder} 
             onAdd={(qty) => addToCart(product, qty)}
          />
        ))}
      </div>

      {sidebarVisible && cart.length > 0 && (
        <CartSidebar
          cart={cart}
          onQuantityChange={updateQuantity}
          onRemove={removeFromCart}
          onPlaceOrder={placeOrder}
          orderPlaced={!!currentOrder}
          onClose={() => setSidebarVisible(false)}
        />
      )}

      {modalVisible && (
        <OrderModal
          order={currentOrder}
          onClose={() => setModalVisible(false)}
        />
      )}

      <div
  style={{
    position: "fixed",
    top: "20px",
    right: "20px",
    transform: toast.visible
      ? "translateY(0) scale(1)"
      : "translateY(-20px) scale(0.95)",
    opacity: toast.visible ? 1 : 0,
    transition: "all 0.3s ease",
    pointerEvents: toast.visible ? "auto" : "none",
    zIndex: 1000,
  }}
>
  <div
    style={{
      backgroundColor: "#28a745",
      color: "#fff",
      padding: "12px 16px",
      borderRadius: "10px",
      fontWeight: "600",
      boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      minWidth: "220px",
    }}
  >
    <span>{toast.message}</span>

    <button
      onClick={() =>
        setToast(t => ({ ...t, visible: false }))
      }
      style={{
        background: "transparent",
        border: "none",
        color: "#fff",
        fontSize: "18px",
        cursor: "pointer",
        marginLeft: "auto",
        lineHeight: 1,
      }}
      aria-label="Close"
    >
      ×
    </button>
  </div>
</div>


    </div>
  );
}

export default UserApp;

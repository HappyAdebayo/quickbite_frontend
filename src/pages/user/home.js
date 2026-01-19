import { Header } from "../../components/header";
import { ProductCard } from "../../components/productCard";
import { FilterButton } from "../../components/filterButton";
import { OrderModal } from "../../components/orderModal";
import { CartSidebar } from "../../components/cartSidebar";
import { useState,useEffect } from "react";
import { useApi } from "../../hooks/useApi";

function UserApp() {

  const { request, loading, error } = useApi();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [filter, setFilter] = useState("All");
  const [cart, setCart] = useState([]);
  const [menus, setMenus] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  const addToCart = (product) => {
    const exists = cart.find(item => item.id === product.id);
    if (exists) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
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

  const completeOrder = () => {
    setCurrentOrder(null);
    setCart([]);
  };

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
            onAdd={() => addToCart(product)}
          />
        ))}
      </div>

      {/* Cart Sidebar */}
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

      {currentOrder && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={completeOrder}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#28a745",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Admin Completes Order
          </button>
        </div>
      )}
    </div>
  );
}

export default UserApp;

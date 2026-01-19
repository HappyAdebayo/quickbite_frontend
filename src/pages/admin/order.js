import { useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";

export default function OrdersPage() {
  const { request, loading, error } = useApi();
  const [orders, setOrders] = useState([]); 

  useEffect(() => {
      const fetchOrders = async () => {
        try {
          const data = await request("get", "/admin/orders");
          setOrders(data.orders);
        } catch (err) {
          console.error("Failed to fetch orders:", err);
        }
      };
  
      fetchOrders();
    }, []);

    console.log(orders,'orders');
    

const updateStatus = async (orderId, currentStatus) => {
    try {
      const nextStatus =
        currentStatus === "pending"
          ? "processing"
          : currentStatus === "processing"
          ? "completed"
          : "completed";

      const data = await request("patch", `/admin/orders/${orderId}/status`, {
        status: nextStatus,
      });

      setOrders(
        orders.map((order) =>
          order.order_number === orderId
            ? { ...order, status: data.order.status }
            : order
        )
      );
    } catch (err) {
      console.error("Failed to update order status:", err);
    }
  };
  return (
    <div className="orders-page">
      <h1>Orders</h1>

      <div className="orders-grid">
        {orders.map((order) => (
          <div className="order-card" key={order.order_number}>
            <div className="order-header">
              <h3>Order #{order.order_number}</h3>
              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>

            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Total:</strong> ₦{order.total_price.toLocaleString()}</p>

            <div className="order-items">
              <strong>Items:</strong>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.menu_name} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>

            {order.status !== "completed" && (
              <button
                className="update-btn"
                onClick={() => updateStatus(order.order_number)}
              >
                Mark as {order.status === "Pending" ? "Preparing" : "Completed"}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* CSS */}
      <style>{`
        .orders-page {
          padding: 16px;
        }
        .orders-page h1 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 24px;
        }

        .orders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .order-card {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .order-header h3 {
          margin: 0;
          font-size: 18px;
        }

        .status {
          padding: 4px 10px;
          border-radius: 6px;
          color: #fff;
          font-weight: 600;
          font-size: 12px;
        }

        .status.pending { background-color: #f59e0b; }
        .status.preparing { background-color: #3b82f6; }
        .status.completed { background-color: #10b981; }

        .order-items ul {
          margin: 4px 0 0 0;
          padding-left: 16px;
        }

        .order-items li {
          font-size: 14px;
          color: #444;
        }

        .update-btn {
          margin-top: 12px;
          background-color: #ed1212;
          color: #fff;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          align-self: flex-start;
        }
        .update-btn:hover { opacity: 0.9; }

        @media (max-width: 600px) {
          .orders-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

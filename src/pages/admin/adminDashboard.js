import { useApi } from "../../hooks/useApi";
import { useEffect,useState } from "react";

export default function AdminDashboard() {
    const { request, loading, error } = useApi();
    const [dashboard, setDashboard] = useState(null);
  
    useEffect(() => {
      fetchDashboard();
    }, []);
  
    const fetchDashboard = async () => {
      try {
        const data = await request("get", "/admin/dashboard"); 
        setDashboard(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (loading) return <p>Loading dashboard...</p>;

  return (
    <>
      <div className="dashboard">
        <h1 className="dashboard-title">Dashboard</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p className="stat-number">{dashboard?.total_orders}</p>
          </div>

          <div className="stat-card">
            <h3>Pending Orders</h3>
            <p className="stat-number pending">{dashboard?.pending_orders}</p>
          </div>

          <div className="stat-card">
            <h3>Available Foods</h3>
            <p className="stat-number">{dashboard?.available_food}</p>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Recent Orders</h2>
          <ul className="orders-list">
            {dashboard?.recent_orders?.map((order) => (
              <li key={order.id}>
                <span className="order-id">Order #{order.order_number}</span>
                <span className="order-date">{order.date}</span>
                <span className="order-total">₦{order.total_price.toLocaleString()}</span>
                <span className={`order-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .dashboard {
          padding: 8px;
        }

        .dashboard-title {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 24px;
          color: #222;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: #ffffff;
          border-radius: 14px;
          padding: 20px;
          border: 1px solid #e5e5e5;
        }

        .stat-card h3 {
          font-size: 14px;
          font-weight: 500;
          color: #777;
          margin-bottom: 10px;
        }

        .stat-number {
          font-size: 28px;
          font-weight: 700;
          color: #ed1212;
        }

        .stat-number.pending {
          color: #f59e0b;
        }

        .dashboard-section {
          background: #ffffff;
          border-radius: 14px;
          padding: 20px;
          border: 1px solid #e5e5e5;
        }

        .dashboard-section h2 {
          font-size: 18px;
          margin-bottom: 12px;
        }

        .orders-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .orders-list li {
          display: grid;
          grid-template-columns: 120px 120px 120px 1fr;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #f0f0f0;
          font-size: 14px;
          color: #444;
        }

        .orders-list li:last-child {
          border-bottom: none;
        }

        .order-id {
          font-weight: 600;
        }

        .order-date {
          color: #777;
        }

        .order-total {
          font-weight: 500;
        }

        .order-status {
          text-align: right;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 6px;
          color: #fff;
        }

        .order-status.pending {
          background-color: #f59e0b;
        }

        .order-status.preparing {
          background-color: #3b82f6;
        }

        .order-status.ready {
          background-color: #10b981;
        }

        .order-status.completed {
          background-color: #6b7280;
        }
          @media (max-width: 768px) {
    .orders-list li {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
    }

    .order-id,
    .order-date,
    .order-total,
    .order-status {
      text-align: left;
      width: 100%;
    }

    .order-status {
      text-align: right;
      align-self: flex-end;
      }
      }
      `}</style>
    </>
  );
}

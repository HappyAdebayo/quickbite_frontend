export default function MenuCard({ item, onToggle, onEdit, onDelete }) {
  return (
    <div className="menu-card">
      <img src={`http://localhost:8000/storage/${item.image}`} alt={item.name} className="menu-image" />

      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <strong>₦{item.price.toLocaleString()}</strong>

      <div className="menu-card-actions">
        <button
          className={`availability-btn ${item.available ? "available" : "unavailable"}`}
          onClick={() => onToggle(item.id)}
        >
          {item.status === 'available' ? "Unavailable" : "Available"}
        </button>

        <div>
          <button className="edit-btn" onClick={() => onEdit(item.id)}>Edit</button>
          <button className="delete-btn" onClick={() => onDelete(item.id)}>Delete</button>
        </div>
      </div>

      {/* CSS for the card */}
      <style>{`
        .menu-card {
          width: 260px;
          background: #fff;
          border: 1px solid #eee;
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .menu-image {
          width: 100%;
          height: 160px;
          object-fit: cover;
          border-radius: 8px;
        }

        .menu-card h3 {
          margin: 0;
          font-size: 18px;
        }

        .menu-card p {
          font-size: 14px;
          color: #666;
          margin: 4px 0;
        }

        .menu-card strong {
          font-size: 16px;
          color: #ed1212;
        }

        .menu-card-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 12px;
        }

        .availability-btn {
          padding: 6px 12px;
          border: none;
          border-radius: 6px;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
        }

        .availability-btn.available {
          background-color: #10b981; /* green */
        }

        .availability-btn.unavailable {
          background-color: #f59e0b; /* orange */
        }

        .edit-btn, .delete-btn {
          padding: 6px 10px;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          margin-left: 6px;
          color: #fff;
        }

        .edit-btn {
          background-color: #3b82f6; /* blue */
        }

        .delete-btn {
          background-color: #ef4444; /* red */
        }

        .edit-btn:hover,
        .delete-btn:hover,
        .availability-btn:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
}

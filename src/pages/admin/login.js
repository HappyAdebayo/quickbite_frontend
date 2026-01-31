import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useApi } from "../../hooks/useApi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const successMessage = location.state?.message;
  const navigate = useNavigate();
  const { request,loading } = useApi();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const data = await request("post", "/admin/login", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("adminEmail", data.admin.email);
      localStorage.setItem("adminLoggedIn", 'true');

      navigate("/admin");
    } catch (err) {

      if (err.response && err.response.data && err.response.data.errors) {
        setError(
          Object.values(err.response.data.errors)
            .flat()
            .join(", ")
        );
      } else if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to login. Try again.");
      }
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        {successMessage && (
        <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>
      )}
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        <Link to={'/signup'}>click to signup</Link>
      </form>

      <style>{`
        .login-page {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f3f4f6;
        }
        .login-form {
          background: #fff;
          padding: 32px;
          border-radius: 12px;
          width: 320px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .login-form h2 {
          margin: 0;
          text-align: center;
          color: #ed1212;
        }
        .login-form input {
          padding: 10px 12px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 14px;
        }
        .login-form button {
          padding: 10px;
          background-color: #ed1212;
          color: #fff;
          font-weight: 600;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
        .login-form button:hover { opacity: 0.9; }
        .error { color: #ef4444; font-size: 14px; text-align: center; }
      `}</style>
    </div>
  );
}

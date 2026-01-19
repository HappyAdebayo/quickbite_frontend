import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApi } from "../../hooks/useApi";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
   const { request,loading } = useApi();

  const handleSignup =async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const data = await request("post", "/admin/register", {
        email,
        password,
        password_confirmation: confirmPassword,
      });


      navigate("/login", { state: { message: "Signup successful! Please login." } }); 
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
        setError("Failed to register. Try again.");
      }
    }

  };

  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>Admin Signup</h2>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>{loading ? "Signing up..." : "Sign Up"}</button>
        <Link to={'/login'}>click to login</Link>
      </form>

      <style>{`
        .signup-page {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f3f4f6;
        }
        .signup-form {
          background: #fff;
          padding: 32px;
          border-radius: 12px;
          width: 320px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .signup-form h2 {
          margin: 0;
          text-align: center;
          color: #ed1212;
        }
        .signup-form input {
          padding: 10px 12px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 14px;
        }
        .signup-form button {
          padding: 10px;
          background-color: #ed1212;
          color: #fff;
          font-weight: 600;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
        .signup-form button:hover { opacity: 0.9; }
        .error { color: #ef4444; font-size: 14px; text-align: center; }
      `}</style>
    </div>
  );
}

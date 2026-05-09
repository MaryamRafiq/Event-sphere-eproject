import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css"

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ STATIC SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login Data:", form);

    alert("Login submitted (static mode)");

    // optional reset
    setForm({ email: "", password: "" });
  };

  return (
    <>
      <div className="login-container">
        <div className="login-wrapper">
          
          {/* HEADER */}
          <div className="login-header">
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Sign in to your account</p>
          </div>

          {/* CARD */}
          <div className="login-card">
            <form onSubmit={handleSubmit} className="login-form">
              
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="input-field"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                className="input-field"
              />

              <button type="submit" className="submit-btn">
                Sign In
              </button>
            </form>

            {/* FOOTER */}
            <p className="login-footer">
              Don't have an account?{" "}
              <Link to="/register" className="login-link">
                Create Account
              </Link>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom"; // Added Link

// Added { mode } prop
export default function Auth({ mode }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { signUp, login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    setError(null);
    let result;
    
    // Uses the 'mode' prop passed from App.jsx
    if (mode === "signup") {
      result = signUp(data.email, data.password);
    } else {
      result = login(data.email, data.password);
    }

    if (result.success) {
      navigate("/");
    } else {
      // Note: check if your context returns .error or .message
      setError(result.error || result.message); 
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          <h1 className="page-title">
            {mode === "signup" ? "Sign Up" : "Login"}
          </h1>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                className="form-input"
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <span className="form-error">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                  maxLength: { value: 12, message: "Password must be less than 12 characters" },
                })}
                className="form-input"
                type="password"
                id="password"
              />
              {errors.password && <span className="form-error">{errors.password.message}</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-large">
              {mode === "signup" ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="auth-switch">
            {/* Switched from onClick to proper Links for the separate routes */}
            {mode === "signup" ? (
              <p>
                Already have an account?{" "}
                <Link to="/login" className="auth-link">Login</Link>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="auth-link">Sign Up</Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
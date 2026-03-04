import { useContext, useState } from "react";
import {useForm} from "react-hook-form";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [mode, setMode] = useState('signup');
  const { signUp, user, logout, login } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { 
    register,
    handleSubmit,
    formState: { errors } 
    } = useForm();

    function onSubmit(data) {
      let result;
      if (mode === 'signup'){
        result = signUp(data.email, data.password);
      } else {
        result = login(data.email, data.password);
      }
      if (result.success){
        navigate("/");
      }
      else{
        setError(result.message);
      }
      console.log(result);
    }

  return (
    <div className='page'>
      <div className="container">
        <div className="auth-container">
          {/* IF USER EXISTS: Show the Logged In Card */}
          
            <h1 className="page-title">{mode === 'signup' ? "Sign Up": "Login"}</h1>
              {error && <div className="error-message">{error}</div>}
            <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
              <button className="btn" type="button" onClick={logout}>Logout</button>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input className="form-input" type="email" id="email" 
                {...register("email", {required: "Email is required"})}>
                </input>
                {errors.email && <span className="form-error">{errors.email.message}</span>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="password">Password</label>
                <input {...register("password", {required: "Password is required", 
                  minLength:{value: 6, message: "Password must be at least 6 characters"},
                  maxLength:{value: 12, message: "Password cannot exceed 12 characters"}
                })}
                className="form-input" type="password" id="password"></input>
                {errors.password && <span className="form-error">{errors.password.message}</span>}
              </div>
              
              <button className="btn btn-primary btn-large" type="submit">
                {mode === 'signup' ? "Sign Up": "Login"}
              </button>
            </form>

            <div className="auth-switch">
              {mode === 'signup' ? 
              <p>
                Already have an account? <span className="auth-link" onClick={()=> {setMode('login'); setError(null);}}> Login</span>
              </p>
              :
              <p>
                Don't have an account? <span className="auth-link" onClick={()=> {setMode('signup'); setError(null);}}> Sign Up</span>
              </p>
              }
            </div>
        </div>
      </div>
    </div>
  );
}
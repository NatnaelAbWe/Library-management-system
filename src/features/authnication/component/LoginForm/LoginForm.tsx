import React, { useRef, useState } from "react";
import "./LoginForm.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../reducx/ReducxStrore";
import { loginUser } from "../../../../reducx/slices/AuthnicationSlices";

interface LoginFormPops {
  toggleRegister(): void;
}

export const LoginForm: React.FC<LoginFormPops> = ({ toggleRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const auth = useSelector((state: RootState) => state.authentication);
  const dispatch: AppDispatch = useDispatch();

  const handleLoginUser = async (e: React.FormEvent) => {
    e.preventDefault(); // Works better on form submit than button click

    if (emailRef.current && passwordRef.current) {
      dispatch(
        loginUser({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      );
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLoginUser}>
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Please enter your details to sign in</p>
        </div>

        {auth.error && (
          <div className="error-banner">
            <span className="icon">⚠️</span>
            Username or password incorrect
          </div>
        )}

        <div className="input-wrapper">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            className={`login-input ${auth.error ? "input-error" : ""}`}
            placeholder="name@company.com"
            required
            ref={emailRef}
          />
        </div>

        <div className="input-wrapper">
          <div className="label-row">
            <label htmlFor="password">Password</label>
          </div>
          <div className="password-input-container">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className={`login-input ${auth.error ? "input-error" : ""}`}
              placeholder="••••••••"
              required
              ref={passwordRef}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <div className="forgot-password">Forgot Password?</div>
        </div>

        <button
          type="submit"
          className={`login-submit ${auth.loading ? "loading" : ""}`}
          disabled={auth.loading}
        >
          {auth.loading ? <div className="spinner"></div> : "Sign In"}
        </button>

        <p className="register-text">
          Don't have an account?
          <span
            type="button"
            className="register-link"
            onClick={toggleRegister}
          >
            Create one here
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;

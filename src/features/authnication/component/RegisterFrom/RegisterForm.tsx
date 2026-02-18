import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../reducx/ReducxStrore";
import {
  registerUser,
  resetRegisterSuccess,
} from "../../../../reducx/slices/AuthnicationSlices";
import "./RegisterForm.css";

interface RegisterFormProps {
  toggleLogin(): void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ toggleLogin }) => {
  const authState = useSelector((state: RootState) => state.authentication);
  const dispatch: AppDispatch = useDispatch();
 
  const firstRef = useRef<HTMLInputElement>(null);
  const lastRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleRegisterUser = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      firstRef.current &&
      lastRef.current &&
      emailRef.current &&
      passwordRef.current
    ) {
      dispatch(
        registerUser({
          firstName: firstRef.current.value,
          lastName: lastRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          type: "PATRON",
        }),
      );
    }
  };

  useEffect(() => {
    if (authState.registerSuccess) {
      setTimeout(() => {
        dispatch(resetRegisterSuccess());
        toggleLogin();
      }, 2000);
    }
  }, [authState.registerSuccess, toggleLogin, dispatch]);

  return (
    <form className="register-form" onSubmit={handleRegisterUser}>
      <h2>Enter your information</h2>

      {authState.error && (
        <p className="register-form-error">
          There was an error during registration.
        </p>
      )}
      {authState.registerSuccess && (
        <p className="register-form-success">
          Registration successful! Redirecting...
        </p>
      )}

      <div className="register-form-name-group">
        <div className="register-form-name-input-group">
          <h6>First Name</h6>
          <input
            type="text"
            placeholder="First Name"
            name="first"
            required
            ref={firstRef}
          />
        </div>
        <div className="register-form-name-input-group">
          <h6>Last Name</h6>
          <input
            type="text"
            placeholder="Last Name"
            name="last"
            required
            ref={lastRef}
          />
        </div>
      </div>

      <div className="input-wrapper">
        <h6>Email Address</h6>
        <input
          type="email"
          placeholder="Email"
          name="email"
          required
          ref={emailRef}
        />
      </div>

      <div className="input-wrapper">
        <h6>Password</h6>
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          ref={passwordRef}
        />
      </div>

      <button
        type="submit"
        className="login-submit"
        disabled={authState.loading}
      >
        {authState.loading ? "Registering..." : "Register"}
      </button>

      <p className="register-text">
        Already have an account?
        <span className="register-link" onClick={toggleLogin}>
          Login here
        </span>
      </p>
    </form>
  );
};

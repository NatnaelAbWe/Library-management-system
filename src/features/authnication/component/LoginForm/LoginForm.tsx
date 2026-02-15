import React, { useRef } from "react"; // Removed unused useState
import "./LoginForm.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../reducx/ReducxStrore";
import { loginUser } from "../../../../reducx/slices/AuthnicationSlices";


export const LoginForm: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const auth = useSelector((state: RootState) => state.authentication);
  const dispatch: AppDispatch = useDispatch(); // Fixed naming to 'dispatch' (lowercase is standard)

  const handleLoginUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 1. Logic to extract values from refs
    if (emailRef.current && passwordRef.current) {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      // 2. Dispatching the thunk you created earlier
      dispatch(
        loginUser({
          email,
          password,
        }),
      );
    }
  };
  return (
    <form className="login-form">
      <h2>Please Login</h2>

      {/* 3. Improved Error Display */}
      {auth.error && (
        <p className="login-form-error">Username or password incorrect</p>
      )}

      {/* 4. Optional: Loading State UI */}
      {auth.loading && <p>Logging in...</p>}

      <div className="login-form-input-group">
        <h6>Email</h6>
        <input
          className="login-form-input"
          placeholder="email"
          name="email"
          required
          ref={emailRef}
        />
      </div>
      <div className="login-form-input-group">
        <h6>Password</h6>
        <input
          className="login-form-input"
          placeholder="password"
          name="password"
          type="password"
          required
          ref={passwordRef}
        />
      </div>

      {/* 5. Disabled button while loading to prevent double-clicks */}
      <button
        className="login-form-submit"
        onClick={handleLoginUser}
        disabled={auth.loading}
      >
        Login
      </button>

      <p>
        Don't have an account?
        <span className="login-form-register"> Create one here.</span>
      </p>
    </form>
  );
};

export default LoginForm;

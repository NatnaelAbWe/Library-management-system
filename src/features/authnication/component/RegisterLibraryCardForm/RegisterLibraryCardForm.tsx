import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../../../reducx/ReducxStrore";
import "./RegisterLibraryCardForm.css";
import { getLibraryCard } from "../../../../reducx/slices/AuthnicationSlices";
import {
  setDisplayLibraryCard,
  setDisplayLogin,
} from "../../../../reducx/slices/modelslices";

export const RegisterLibraryCardForm: React.FC = () => {
  const { loggedInUser, libraryCard, isLoading } = useSelector(
    (state: RootState) => state.authentication,
  );
  const dispatch: AppDispatch = useDispatch();

  const handleCreateLibraryCard = () => {
    if (loggedInUser?._id) {
      dispatch(getLibraryCard(loggedInUser._id));
    }
  };

  const handleLoginClick = () => {
    // Close library modal first, then open login
    dispatch(setDisplayLibraryCard(false));
    dispatch(setDisplayLogin(true));
  };

  return (
    <div className="register-library-card-container">
      {loggedInUser ? (
        <>
          <h3 className="register-library-card-text">
            Welcome, {loggedInUser.firstName}!
          </h3>
          <p className="register-library-card-subtext">
            To sign up for a new library card or retrieve your ID, use the
            button below.
          </p>

          {libraryCard ? (
            <div className="library-card-display">
              <span className="card-label">Your Library Card Number:</span>
              <span className="card-number">{libraryCard}</span>
            </div>
          ) : (
            <button
              className="register-library-modal-button"
              onClick={handleCreateLibraryCard}
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Get Library Card"}
            </button>
          )}
        </>
      ) : (
        <>
          <h3 className="register-library-card-text">Membership Required</h3>
          <p className="register-library-card-subtext">
            You must be a member to obtain a library card. Please login or
            register for free.
          </p>
          <button
            className="register-library-modal-button"
            onClick={handleLoginClick}
          >
            Login Here
          </button>
        </>
      )}
    </div>
  );
};

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Create } from "@mui/icons-material";
import "./UpdateUserForm.css";
import type { AppDispatch, RootState } from "../../../../reducx/ReducxStrore";
import type { User } from "../../../../models/user";

export const UpdateUserForm: React.FC = () => {
  const userState = useSelector((state: RootState) => state.authentication);
  const dispatch: AppDispatch = useDispatch();

  const [displayUpdate, setDisplayUpdate] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>(userState.profileUser);

  const navigate = useNavigate();

  return (
    <form className="update-user-form">
      <div className="update-user-input-group">
        <h4>First Name:</h4>
        <input
          className="update-user-input"
          name="firstName"
          value={user?.firstName}
          onChange={() => {}}
          disabled={userState.loggedInUser?._id !== userState.profileUser?._id}
        />
        {userState.loggedInUser?._id === userState.profileUser?._id && (
          <Create
            sx={{
              position: "absolute",
              top: "65%",
              right: "0",
            }}
          />
        )}
      </div>
      <div className="update-user-input-group">
        <h4>Last Name:</h4>
        <input
          className="update-user-input"
          name="lastName"
          value={user?.lastName}
          onChange={() => {}}
          disabled={userState.loggedInUser?._id !== userState.profileUser?._id}
        />
        {userState.loggedInUser?._id === userState.profileUser?._id && (
          <Create
            sx={{
              position: "absolute",
              top: "65%",
              right: "0",
            }}
          />
        )}
      </div>
      <div className="update-user-input-group">
        <h4>Email:</h4>
        <input
          className="update-user-input"
          name="email"
          value={user?.email}
          onChange={() => {}}
          disabled={userState.loggedInUser?._id !== userState.profileUser?._id}
        />
        {userState.loggedInUser?._id === userState.profileUser?._id && (
          <Create
            sx={{
              position: "absolute",
              top: "65%",
              right: "0",
            }}
          />
        )}
      </div>
    </form>
  );
};

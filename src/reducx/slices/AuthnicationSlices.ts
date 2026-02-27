import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import type {
  User,
  LoginUserPayload,
  RegisterUserPayLoad,
  FetchUserPayload,
} from "../../models/user";

interface AuthenticationSliceState {
  loggedInUser: User | undefined;
  profileUser: User | undefined;
  libraryCard: string;
  loading: boolean;
  error: boolean;
  registerSuccess: boolean;
}

const initialState: AuthenticationSliceState = {
  loggedInUser: undefined,
  profileUser: undefined,
  libraryCard: "",
  loading: false,
  error: false,
  registerSuccess: false,
};

// --- Thunks ---

export const loginUser = createAsyncThunk(
  "auth/login",
  async (user: LoginUserPayload, thunkAPI) => {
    try {
      const req = await axios.post("http://localhost:8000/auth/login", user);
      return req.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user: RegisterUserPayLoad, thunkAPI) => {
    try {
      const req = await axios.post("http://localhost:8000/auth/register", user);
      return req.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const fetchUser = createAsyncThunk(
  "auth/fetch",
  async (payload: FetchUserPayload, thunkAPI) => {
    try {
      // Remove /auth from the URL
      const req = await axios.get(
        `http://localhost:8000/users/${payload.userId}`,
      );
      const user = req.data.user;
      return { user, property: payload.property };
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || e.message);
    }
  },
);

export const updateUser = createAsyncThunk(
  "auth/update",
  async (payload: User, thunkAPI) => {
    try {
      const req = await axios.put("http://localhost:8000/users", payload);
      return req.data.user;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const getLibraryCard = createAsyncThunk(
  "auth/librarycard",
  async (userId: string, thunkAPI) => {
    try {
      const req = await axios.post("http://localhost:8000/card/", {
        user: userId,
      });
      console.log(req.data.libraryCard);

      return req.data.libraryCard;
    } catch (e: any) {
      const errorMessage =
        e.response?.data?.message || "Failed to generate card";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

// --- Slice ---

export const AuthenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    resetRegisterSuccess: (state) => {
      state.registerSuccess = false;
    },
    // Added resetUser to handle manual logout
    resetUser: (state) => {
      state.loggedInUser = undefined;
      state.profileUser = undefined;
      localStorage.removeItem("userId");
    },
  },
  extraReducers: (builder) => {
    /* --- Login Cases --- */
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loggedInUser = action.payload;
        // PERSISTENCE: Save ID to localStorage so refresh doesn't log you out
        localStorage.setItem("userId", action.payload._id);
        state.loading = false;
        state.error = false;
      },
    );
    builder.addCase(loginUser.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });

    /* --- Registration Cases --- */
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.registerSuccess = false;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.registerSuccess = true;
      state.error = false;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
      state.registerSuccess = false;
    });

    builder
      .addCase(getLibraryCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      /* --- Inside AuthenticationSlice.ts --- */

      .addCase(
        getLibraryCard.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;

          state.libraryCard = action.payload;
        },
      )
      .addCase(getLibraryCard.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });

    /* --- Fetch User Cases --- */
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      const { user, property } = action.payload;

      // Note: Ensure your dispatch uses 'LoggedInUser' or 'ProfileUser'
      // to match your TypeScript model exactly.
      if (property === "ProfileUser") {
        state.profileUser = user;
      } else if (property === "LoggedInUser") {
        state.loggedInUser = user;
      }

      state.loading = false;
      state.error = false;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    /* --- Update User Cases --- */
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(
      updateUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        // If the updated user is the one currently logged in, update the state
        if (
          state.loggedInUser &&
          state.loggedInUser._id === action.payload._id
        ) {
          state.loggedInUser = action.payload;
        }

        // If the updated user is the one being viewed on a profile page, update that too
        if (state.profileUser && state.profileUser._id === action.payload._id) {
          state.profileUser = action.payload;
        }

        state.loading = false;
        state.error = false;
      },
    );

    builder.addCase(updateUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { resetRegisterSuccess, resetUser } = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;

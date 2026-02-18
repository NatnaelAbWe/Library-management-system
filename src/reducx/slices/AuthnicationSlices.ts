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
  loading: boolean;
  error: boolean;
  registerSuccess: boolean;
}

const initialState: AuthenticationSliceState = {
  loggedInUser: undefined,
  profileUser: undefined,
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
      const req = await axios.get(
        `http://localhost:8000/auth/users/${payload.userId}`,
      );
      const user = req.data.user;

      return {
        user,
        property: payload.property,
      };
    } catch (e: any) {
      // DO NOT return the whole 'e'. Return the message string instead.
      return thunkAPI.rejectWithValue(
        e.response?.data?.message || e.message || "Failed to fetch user",
      );
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
  },
});

export const { resetRegisterSuccess, resetUser } = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;

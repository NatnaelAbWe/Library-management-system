import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  User,
  type LoginUserPayload,
  type RegisterUserPayLoad,
} from "../../models/user";
import axios from "axios";

interface AuthenticationSliceState {
  loggedInUser: User | undefined;
  loading: boolean;
  error: boolean;
  registerSuccess: boolean;
}

const initialState: AuthenticationSliceState = {
  loggedInUser: undefined,
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

// --- Slice ---

export const AuthenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    // Synchronous action to reset success state
    resetRegisterSuccess: (state) => {
      state.registerSuccess = false;
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
  },
});

// --- Exports ---

export const { resetRegisterSuccess } = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;

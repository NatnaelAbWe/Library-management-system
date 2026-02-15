import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, type LoginUserPayload } from "../../models/user";
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

export const loginUser = createAsyncThunk(
  "auth/login",
  async (user: LoginUserPayload, thunkAPI) => {
    try {
      // Note: Ensure your backend returns the user object in req.data.user
      const req = await axios.post("http://localhost:8000/auth/login", user);
      return req.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const AuthenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  // 1. Changed "extraReducer" to "extraReducers" (plural)
  extraReducers: (builder) => {
    // 2. All builder cases must stay inside this function scope

    // Pending logic
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    // Fulfilled logic
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loggedInUser = action.payload;
        state.loading = false;
        state.error = false;
      },
    );

    // Rejected logic
    builder.addCase(loginUser.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export default AuthenticationSlice.reducer;

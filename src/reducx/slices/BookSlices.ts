import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { Book } from "../../models/Book";

interface BookSliceState {
  loading: boolean;
  error: boolean;
  books: Book[];
}

const initialState: BookSliceState = {
  loading: true,
  error: false,
  books: [],
};

// 1. Create the Thunk to fetch books
export const fetchAllBooks = createAsyncThunk(
  "book/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("http://localhost:8000/book");
      console.log("Api response:", res.data);
      return res.data; // This returns { message: string, count: number, books: Book[] }
    } catch (e) {
      console.log("api error", e);
      return thunkAPI.rejectWithValue(e);
    }
  },
);

// 2. Create the Slice
export const BookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllBooks.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchAllBooks.fulfilled, (state, action) => {
      state.books = action.payload.books;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(fetchAllBooks.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default BookSlice.reducer;

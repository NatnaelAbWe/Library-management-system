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
      // Replace with your actual API endpoint
      const res = await axios.get("http://localhost:8000/books");
      return res.data;
    } catch (e) {
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
    builder.addCase(
      fetchAllBooks.fulfilled,
      (state, action: PayloadAction<Book[]>) => {
        state.books = action.payload;
        state.loading = false;
        state.error = false;
      },
    );
    builder.addCase(fetchAllBooks.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default BookSlice.reducer;

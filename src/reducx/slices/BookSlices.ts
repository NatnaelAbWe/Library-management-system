import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { Book } from "../../models/Book";
import type { PageInfo } from "../../models/page";

interface BookSliceState {
  loading: boolean;
  error: boolean;
  books: Book[];
  pagingInformation: PageInfo | null;
}

const initialState: BookSliceState = {
  loading: true,
  error: false,
  books: [],
  pagingInformation: null,
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

export const queryBooks = createAsyncThunk(
  "book/query",
  async (payload: string, thunkAPI) => {
    try {
      let req = await axios.get(`http://localhost:8000/book/query${payload}`);
      return req.data.page;
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
    builder.addCase(fetchAllBooks.fulfilled, (state, action) => {
      state.books = action.payload.books;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(fetchAllBooks.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(queryBooks.pending, (state) => {
      state.books = [];
      state.loading = true;
      state.error = false;
    });
    builder.addCase(queryBooks.fulfilled, (state, action) => {
      state.books = action.payload.items;
      state.pagingInformation = {
        totalCount: action.payload.totalCount,
        currentPage: action.payload.currentPage,
        totalPage: action.payload.totalPages,
        limit: action.payload.limit,
        pageCount: action.payload.pageCount,
      };
      state.loading = false;
    });
    builder.addCase(queryBooks.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default BookSlice.reducer;

import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import {
  addBookById,
  addNewBook,
  fetchBookDetails,
  deleteBook,
  fetchRecommendedBooks,
  fetchOwnBooks,
  deleteReadingRecord,
  readingStart,
  readingStop,
} from './operations';
import { BooksState, Book, ReadingRecord } from './books-types';

const initialState: BooksState = {
  data: [],
  myBooks: [],
  isLoading: false,
  error: null,
  totalPages: 1,
  readBook: [],
  allInfoBook: null,
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRecommendedBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.results;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(addNewBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.isLoading = false;
        state.myBooks.push(action.payload);
      })
      .addCase(addBookById.fulfilled, (state, action: PayloadAction<Book>) => {
        state.isLoading = false;
        state.myBooks.push(action.payload);
      })
      .addCase(fetchOwnBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.isLoading = false;
        state.myBooks = action.payload;
      })
      .addCase(deleteBook.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
        state.isLoading = false;
        state.myBooks = state.myBooks.filter(book => book._id !== action.payload.id);
      })
      .addCase(readingStart.fulfilled, (state, action: PayloadAction<ReadingRecord>) => {
        state.isLoading = false;
        state.readBook.push(action.payload);
      })
      .addCase(readingStop.fulfilled, (state, action: PayloadAction<ReadingRecord>) => {
        state.isLoading = false;
        state.readBook.push(action.payload);
      })
      .addCase(deleteReadingRecord.fulfilled, (state, action: PayloadAction<ReadingRecord[]>) => {
        state.isLoading = false;
        state.readBook = action.payload;
      })
      .addCase(fetchBookDetails.fulfilled, (state, action: PayloadAction<Book>) => {
        state.isLoading = false;
        state.allInfoBook = action.payload;
      })
      .addMatcher(
        isAnyOf(
          fetchRecommendedBooks.pending,
          addNewBook.pending,
          addBookById.pending,
          fetchOwnBooks.pending,
          deleteBook.pending,
          readingStart.pending,
          readingStop.pending,
          deleteReadingRecord.pending,
          fetchBookDetails.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchRecommendedBooks.rejected,
          addNewBook.rejected,
          addBookById.rejected,
          fetchOwnBooks.rejected,
          deleteBook.rejected,
          readingStart.rejected,
          readingStop.rejected,
          deleteReadingRecord.rejected,
          fetchBookDetails.rejected
        ),
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload || 'Something went wrong';
        }
      );
  },
});
export const bookReducer = bookSlice.reducer;

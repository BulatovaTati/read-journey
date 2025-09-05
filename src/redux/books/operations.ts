import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Book,
  FetchRecommendedBooksParams,
  FetchRecommendedBooksResponse,
  ReadingRecord,
} from './books-types';

export const fetchRecommendedBooks = createAsyncThunk<
  FetchRecommendedBooksResponse,
  FetchRecommendedBooksParams,
  { rejectValue: string }
>(
  'books/fetchRecommendedBooks',
  async ({ page = 1, limit = 3, title = '', author = '' }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<FetchRecommendedBooksResponse>(
        `/books/recommend?page=${page}&limit=${limit}&title=${title}&author=${author}`
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewBook = createAsyncThunk<Book, Partial<Book>, { rejectValue: string }>(
  'books/addNew',
  async (books, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<Book>(`/books/add`, books);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addBookById = createAsyncThunk<Book, string, { rejectValue: string }>(
  'books/add',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<Book>(`/books/add/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBook = createAsyncThunk<{ id: string }, string, { rejectValue: string }>(
  'books/remove',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete<{ id: string }>(`/books/remove/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOwnBooks = createAsyncThunk<Book[], string | undefined, { rejectValue: string }>(
  'books/own',
  async (status = '', { rejectWithValue }) => {
    try {
      const url = status ? `/books/own?status=${status}` : '/books/own';
      const { data } = await axios.get<Book[]>(url);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const readingStart = createAsyncThunk<
  ReadingRecord,
  Partial<ReadingRecord>,
  { rejectValue: string }
>('books/reading/start', async (book, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<ReadingRecord>(`/books/reading/start`, book);

    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const readingStop = createAsyncThunk<
  ReadingRecord,
  Partial<ReadingRecord>,
  { rejectValue: string }
>('books/reading/finish', async (book, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<ReadingRecord>(`/books/reading/finish`, book);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const deleteReadingRecord = createAsyncThunk<
  ReadingRecord[],
  { bookId: string; readingId: string },
  { rejectValue: string }
>('books/reading', async (book, { rejectWithValue }) => {
  try {
    const { data } = await axios.delete<ReadingRecord[]>(
      `/books/reading?bookId=${book.bookId}&readingId=${book.readingId}`
    );

    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchBookDetails = createAsyncThunk<Book, string, { rejectValue: string }>(
  'books/bookId',
  async (bookId, thunkAPI) => {
    try {
      const { data } = await axios.get<Book>(`/books/${bookId}`);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

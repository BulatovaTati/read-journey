import { RootState } from '../store';

export const selectBookData = (state: RootState) => state.book?.data;
export const selectTotalPage = (state: RootState) => state.book?.totalPages;
export const selectOwnBooks = (state: RootState) => state.book?.myBooks;
export const selectInfoCurrentBook = (state: RootState) => state.book?.allInfoBook;
export const selectReadBook = (state: RootState) => state.book?.readBook;
export const selectIsLoading = (state: RootState) => state.book.isLoading;

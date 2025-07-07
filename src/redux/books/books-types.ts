export interface ProgressEntry {
  page: number;
  date: string;
}

export interface TimeLeftToRead {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  status?: 'unread' | 'in-progress' | 'done';
  owner?: string;
  progress?: ProgressEntry[];
  timeLeftToRead?: TimeLeftToRead;
}

export interface ReadingRecord {
  id: string;
  bookId: string;
  startDate: string;
  endDate?: string;
  progressPages: number;
}

export interface BooksState {
  data: Book[];
  myBooks: Book[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  readBook: ReadingRecord[];
  allInfoBook: Book | null;
}

export interface FetchRecommendedBooksResponse {
  results: Book[];
  totalPages: number;
}

export interface FetchRecommendedBooksParams {
  page?: number;
  limit?: number;
  title?: string;
  author?: string;
}

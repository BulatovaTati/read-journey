export interface ReadingProgress {
  _id: string;
  startReading: string;
  finishReading?: string;
  startPage: number;
  finishPage?: number;
  status: 'active' | 'inactive';
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
  progress?: ReadingProgress[];
  timeLeftToRead?: TimeLeftToRead;
}

export interface ReadingRecord {
  _id: string;
  startDate: string;
  endDate?: string;
  page: number;
  progressPages: number;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface BooksState {
  data: Book[];
  myBooks: Book[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  readBook: ReadingRecord[];
  allInfoBook: Book | null;
  filter: FilterOption;
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

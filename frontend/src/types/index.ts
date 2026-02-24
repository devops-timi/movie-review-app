export interface Genre {
  id: number;
  name: string;
  slug: string;
  movie_count: number;
}

export interface Movie {
  id: number;
  title: string;
  slug: string;
  description: string;
  release_year: number;
  director: string;
  genre_id: number;
  genre_name: string;
  genre_slug: string;
  poster_url: string | null;
  duration_minutes: number | null;
  avg_rating: string | null;
  review_count: number;
  created_at: string;
}

export interface Review {
  id: number;
  movie_id: number;
  movie_title?: string;
  movie_slug?: string;
  reviewer_name: string;
  rating: number;
  title: string;
  body: string;
  created_at: string;
}

export interface PaginatedMovies {
  success: boolean;
  movies: Movie[];
  total: number;
  page: number;
  limit: number;
}

export interface PaginatedReviews {
  success: boolean;
  reviews: Review[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface PaginationResponse<T> {
  items: T[];
  totalPages: number;
  currentPage: number;
}

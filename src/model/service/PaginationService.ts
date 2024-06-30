interface PaginationServiceInterface {
  getPageCount(totalCount: number, limit: number): number;
}

export { PaginationServiceInterface };

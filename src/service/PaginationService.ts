import { PaginationServiceInterface } from "@/model/service/PaginationService";

class PaginationService implements PaginationServiceInterface {
  private static instance: PaginationServiceInterface;

  public static getInstance(): PaginationServiceInterface {
    if (!PaginationService.instance) {
      PaginationService.instance = new PaginationService();
    }
    return PaginationService.instance;
  }
  public getPageCount = (totalCount: number, limit: number) => {
    return Math.ceil(totalCount / limit);
  };
}

export { PaginationService };

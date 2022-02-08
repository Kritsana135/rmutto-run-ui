export interface IBaseInputReq<T> {
  input: T;
}

export interface IPagination {
  page: number;
  perPage: number;
  totalItems: number;
}

export interface IResponse<T> {
  status: number;
  data: T | undefined;
  error: string | undefined;
}

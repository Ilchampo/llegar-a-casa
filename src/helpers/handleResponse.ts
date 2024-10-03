import type { IResponse } from '../interfaces/response.interface';

const handleResponse = <T>(status: number, data: T): IResponse<T> => ({
  status,
  data,
  error: undefined,
});

export default handleResponse;

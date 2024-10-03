import type { IResponse } from '../interfaces/response.interface';
import status from '../constants/status';

const handleError = <T>(error: unknown): IResponse<T> => {
  if (error instanceof Error) {
    return {
      status: status.INTERNAL_SERVER_ERROR,
      data: undefined,
      error: error.message,
    };
  }

  return {
    status: status.INTERNAL_SERVER_ERROR,
    data: undefined,
    error: 'An unexpected error occurred',
  };
};

export default handleError;

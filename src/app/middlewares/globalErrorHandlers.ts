/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
const globalErrorHandlers: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'something went wrong';
  type TErrorResponse = { path: string | number; message: string }[];

  let errorResponse: TErrorResponse = [
    {
      path: '',
      message: 'something went wrong',
    },
  ];

  if (error instanceof ZodError) {
    statusCode = 400;
    message = 'ami zoz error';
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorResponse,
    amiError: error,
  });
};
export default globalErrorHandlers;

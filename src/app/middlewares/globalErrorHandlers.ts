/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import config from '../config';
import { TErrorResponse } from '../interface/error';
const globalErrorHandlers: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'something went wrong';

  let errorSources: TErrorResponse = [
    {
      path: '',
      message: 'something went wrong',
    },
  ];

  const handleZodError = (error: ZodError) => {
    const statusCode = 400;
    const message = 'validation error';
    const errorSources = error.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue?.path?.length - 1],
        message: issue.message,
      };
    });
    return {
      statusCode,
      message,
      errorSources,
    };
  };

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // amiError: error,
    stack: config.node_env === 'development' ? error?.stack : null,
  });
};
export default globalErrorHandlers;

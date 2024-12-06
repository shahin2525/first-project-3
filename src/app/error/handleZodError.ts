import { ZodError, ZodIssue } from 'zod';

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

export default handleZodError;

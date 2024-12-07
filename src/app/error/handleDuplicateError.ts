/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handelDuplicateError = (error: any): TGenericErrorResponse => {
  const regex = /"([^"]+)"/;

  const match = error.message.match(regex);
  const extractedMsg = match && match[1];
  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMsg} is already exist`,
    },
  ];
  const statusCode = 400;
  const message = 'duplicate error';

  return {
    statusCode,
    message,
    errorSources,
  };
};
export default handelDuplicateError;

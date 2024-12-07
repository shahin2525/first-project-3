import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handelDuplicateError = (error: any): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: '',
      message: ``,
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

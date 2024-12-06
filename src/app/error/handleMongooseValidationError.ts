import mongoose from 'mongoose';
import { TErrorSources } from '../interface/error';

const handleMongooseValidationError = (err: mongoose.Error.ValidationError) => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );
  const statusCode = 400;
  const message = 'ValidationError';

  return {
    statusCode,
    message,
    errorSources,
  };
};
export default handleMongooseValidationError;

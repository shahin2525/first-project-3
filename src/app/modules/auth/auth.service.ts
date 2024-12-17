import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/appError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcryptjs';
const loginUser = async (payload: TLoginUser) => {
  console.log(payload);
  //   check user
  const isUserExists = await User.findOne({
    id: payload?.id,
  });
  if (!isUserExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'user not found');
  }
  // check is deleted true

  const isUserDeleted = isUserExists?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'user is deleted');
  }
  //   is user blocked

  const isUserBlocked = isUserExists?.status === 'blocked';
  if (isUserBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'user is blocked');
  }
  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    isUserExists?.password,
  );
  console.log(isPasswordMatch);
  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.FORBIDDEN, 'password is not match');
  }
  return {};
};

export const AuthServices = {
  loginUser,
};

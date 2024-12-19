import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/appError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  //   check user
  const user = await User.findOne({ id: payload.id });
  console.log(user?.id);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'user not found');
  }

  // check is deleted true

  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'user is deleted');
  }

  //   is user blocked

  const isUserBlocked = user?.status === 'blocked';
  if (isUserBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'user is blocked');
  }
  const isPasswordMatch = await User.isPasswordMatch(
    payload.password,
    user?.password,
  );
  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.FORBIDDEN, 'password is not match');
  }
  // access token
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = jwt.sign(
    {
      data: jwtPayload,
    },
    config.access_secret_token as string,
    { expiresIn: '10d' },
  );

  return {
    accessToken,
    needsPasswordChanges: user.needsPasswordChange,
  };
};

const changePassword = (data1, data2) => {};
export const AuthServices = {
  loginUser,
  changePassword,
};

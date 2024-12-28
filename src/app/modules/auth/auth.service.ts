import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/appError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { hash } from 'bcryptjs';
import { createToken } from './auth.utils';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../utils/sendEmail';
const loginUser = async (payload: TLoginUser) => {
  //   check user
  const user = await User.userExists(payload.id);
  // console.log(user);
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
  const accessToken = createToken(
    jwtPayload,
    config.access_secret_token as string,
    config.access_expires_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.refresh_secret_token as string,
    config.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChanges: user.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { newPassword: string; oldPassword: string },
) => {
  // console.log(userData.data.userId);
  const id = userData.data.userId;
  const role = userData.data.role;
  //   check user
  const user = await User.userExists(id);
  // console.log(user);
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
    payload.oldPassword,
    user?.password,
  );
  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.FORBIDDEN, 'password is not match');
  }
  // update password
  const bcryptPassword = await hash(payload.newPassword, Number(config.bcrypt));
  const result = await User.findOneAndUpdate(
    {
      id,
      role,
    },
    {
      password: bcryptPassword,
      needsPasswordChange: false,
      changePasswordAt: new Date(),
    },
  );
  return result;
};

// refresh token
const refreshToken = async (token: string) => {
  // invalid token - synchronous

  const decoded = jwt.verify(
    token,
    config.refresh_secret_token as string,
  ) as JwtPayload;

  const { data, iat } = decoded;
  const { userId } = data;
  // dfd
  //   check user
  const user = await User.userExists(userId);
  // console.log(user);
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

  // password change timesAt === true

  if (
    user.changePasswordAt &&
    User.isJWTIssuedBeforePasswordChanged(user.changePasswordAt, iat as number)
  ) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'you are not authorize 1');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.access_secret_token as string,
    config.access_expires_in as string,
  );

  return {
    accessToken,
  };
};

const forgetPassword = async (userId: string) => {
  //   check user
  const user = await User.userExists(userId);
  // console.log(user);
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

  // access token
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const resetToken = createToken(
    jwtPayload,
    config.access_secret_token as string,
    '10m',
  );

  const resetUILink = `http://localhost:5000?id=${user?.id}&token=${resetToken}`;

  console.log(resetUILink);
  sendEmail(forgetPassword);
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
};

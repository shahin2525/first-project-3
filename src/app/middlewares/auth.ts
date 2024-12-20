import { NextFunction, Request, Response } from 'express';

import catchAsync from '../utils/catchAsync';
import AppError from '../error/appError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
//
const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // console.log(token);
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'you are unauthorize 1');
    }

    // invalid token - synchronous

    const decoded = jwt.verify(
      token,
      config.access_secret_token as string,
    ) as JwtPayload;
    // console.log(decoded);
    const { data, iat } = decoded;
    const { role, userId } = data;

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
      User.isJWTIssuedBeforePasswordChanged(
        user.changePasswordAt,
        iat as number,
      )
    ) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'you are not authorize 2');
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'you are not authorize 3');
    }

    req.user = decoded as JwtPayload;
    next();

    // err

    // verify a token symmetric
    // jwt.verify(
    //   token,
    //   config.access_secret_token as string,
    //   function (err, decoded) {
    //     if (err) {
    //       throw new AppError(
    //         StatusCodes.UNAUTHORIZED,
    //         'you are not authorize 2',
    //       );
    //     }

    //   },
    // );
  });
};
export default auth;

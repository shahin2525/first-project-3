import { NextFunction, Request, Response } from 'express';

import catchAsync from '../utils/catchAsync';
import AppError from '../error/appError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
//
const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // console.log(token);
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'you are unauthorize');
    }

    // verify a token symmetric
    jwt.verify(
      token,
      config.access_secret_token as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(StatusCodes.UNAUTHORIZED, 'you are not authorize');
        }

        const role = (decoded as JwtPayload)?.data?.role;
        // console.log('mld dc role', role);
        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(StatusCodes.UNAUTHORIZED, 'you are not authorize');
        }

        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};
export default auth;

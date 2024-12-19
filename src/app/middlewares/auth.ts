import { NextFunction, Request, Response } from 'express';

import catchAsync from '../utils/catchAsync';
import AppError from '../error/appError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
const auth = (...requiredRoles: TUserRole[]) => {
  console.log(requiredRoles);
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.headers);
    const token = req.headers.authorization;
    // console.log(token);
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'you are unauthorize');
    }
    next();

    // verify a token symmetric
    jwt.verify(
      token,
      config.access_secret_token as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(StatusCodes.UNAUTHORIZED, 'you are not authorize');
        }
        console.log(decoded);

        const role = (decoded as JwtPayload).role;
        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(StatusCodes.UNAUTHORIZED, 'you are not authorize');
        }

        req.user = decoded as JwtPayload;
      },
    );
  });
};
export default auth;

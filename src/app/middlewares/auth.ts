import { NextFunction, Request, Response } from 'express';

import catchAsync from '../utils/catchAsync';
import AppError from '../error/appError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
const auth = () => {
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
        req.user = decoded as JwtPayload;
      },
    );
  });
};
export default auth;

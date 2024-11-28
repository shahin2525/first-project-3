/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from 'http-status-ts';

const notFoundRoutes = (req: Request, res: Response, next: NextFunction) => {
  res.status(HttpStatus.NOT_FOUND).json({
    success: false,
    message: 'api not found !!',
    err: '',
  });
};
export default notFoundRoutes;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
// TODO
// const HttpStatus = require('http-status');
// import { HttpStatus } from 'http-status-ts';

const notFoundRoutes = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'api not found !!',
    err: '',
  });
};
export default notFoundRoutes;

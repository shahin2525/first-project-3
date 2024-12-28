import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  const { accessToken, refreshToken, needsPasswordChanges } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'login user successfully',
    data: { accessToken, needsPasswordChanges },
  });
});
// changePassword
const changePassword: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user;
  const password = req.body;
  // console.log(user, password);
  await AuthServices.changePassword(user, password);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'change password successfully',
    data: null,
  });
});

// for refresh token
const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'retrieve refresh token successfully',
    data: result,
  });
});

// forget password

const forgetPassword: RequestHandler = catchAsync(async (req, res) => {
  const userId = req.body.id;
  const result = await AuthServices.forgetPassword(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Reset link is generated successfully!',
    data: result,
  });
});
export const AuthController = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
};

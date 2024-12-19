import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: 500,
    success: true,
    message: 'login user  successfully',
    data: result,
  });
});
// changePassword
const changePassword: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user;
  const password = req.body;
  console.log(user, password);
  // const result = await AuthServices.changePassword(user, password);

  sendResponse(res, {
    statusCode: 500,
    success: true,
    message: 'change password successfully',
    data: null,
  });
});
export const AuthController = {
  loginUser,
  changePassword,
};

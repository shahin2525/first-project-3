import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

// create student
const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student } = req.body;

  const result = await UserServices.createStudentIntoDB(password, student);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'student create successfully',
    data: result,
  });
});

// create faculty
const createFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { password, faculty } = req.body;
  // console.log(req.body);

  const result = await UserServices.creteFacultyIntoDB(password, faculty);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'faculty create successfully',
    data: result,
  });
});
// create admin
const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { password, admin } = req.body;
  // console.log(req.body);

  const result = await UserServices.creteAdminIntoDB(password, admin);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'admin create successfully',
    data: result,
  });
});
// get me
// create admin
const getMe: RequestHandler = catchAsync(async (req, res) => {
  const decode = req.user;
  const userId = decode?.data?.userId;
  const role = decode?.data?.role;

  const result = await UserServices.getMeFromDB(userId, role);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'get me successfully',
    data: result,
  });
});
export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
};

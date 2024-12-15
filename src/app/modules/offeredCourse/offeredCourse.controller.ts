import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseServices } from './offeredCourse.service';
import { StatusCodes } from 'http-status-codes';

// create academic faculty
const createOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'OfferedCourse create successfully',
    data: result,
  });
});
// get all academic faculty
const getAllOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getAllOfferedCourseFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'get all OfferedCourse  successfully',
    data: result,
  });
});
// get single academic faculty
const getSingleOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'get single OfferedCourse  successfully',
    data: result,
  });
});
// update academic faculty
const updateOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
    id,
    updateData,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'update OfferedCourse  successfully',
    data: result,
  });
});
export const OfferedCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
};

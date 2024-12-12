import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';
import { StatusCodes } from 'http-status-codes';

// create academic faculty
const createCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course create successfully',
    data: result,
  });
});
// get all academic faculty
const getAllCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourseFromDB(req.query);

  sendResponse(res, {
    statusCode: 500,
    success: true,
    message: 'get all Course  successfully',
    data: result,
  });
});
// get single academic faculty
const getSingleCourse: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CourseServices.getSingleCourseFromDB(id);

  sendResponse(res, {
    statusCode: 500,
    success: true,
    message: 'get single Course  successfully',
    data: result,
  });
});
// update academic faculty
const updateCourse: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await CourseServices.updateCourseIntoDB(id, updateData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'update Course  successfully',
    data: result,
  });
});
// delete course
const deleteCourse: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CourseServices.deleteCourseIntoDB(id);

  sendResponse(res, {
    statusCode: 500,
    success: true,
    message: 'delete Course  successfully',
    data: result,
  });
});
// courseFacultyAssign

const courseFacultyAssign = catchAsync(async (req, res) => {
  const id = req.params.courseId;
  const courseFacultyData = req.body;
  const result = await CourseServices.courseFacultyAssignIntoDB(
    id,
    courseFacultyData,
  );

  sendResponse(res, {
    statusCode: 500,
    success: true,
    message: 'create Course-faculty  successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  courseFacultyAssign,
};

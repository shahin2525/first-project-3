import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { FacultyServices } from './faculty.service';
import sendResponse from '../../utils/sendResponse';

const getAllFaculty: RequestHandler = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFaculty(req.query);

  sendResponse(res, {
    statusCode: 500,
    success: true,
    message: 'get all faculty successfully',
    data: result,
  });
});
const getSingleFaculty: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await FacultyServices.getSingleFaculty(id);

  sendResponse(res, {
    statusCode: 500,
    success: true,
    message: 'get single faculty successfully',
    data: result,
  });
});

const updateFaculty: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { faculty } = req.body;

  // Update the faculty in the database
  const result = await FacultyServices.updateFacultyFromDB(id, faculty);

  sendResponse(res, {
    statusCode: 500,
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  });
});
const deleteFaculty: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  // Update the faculty in the database
  const result = await FacultyServices.deleteFacultyFromDB(id);

  sendResponse(res, {
    statusCode: 500,
    success: true,
    message: 'delete faculty successfully',
    data: result,
  });
});
export const FacultyController = {
  // createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};

import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';

// create academic faculty
const createAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: 500,
    success: true,
    message: 'AcademicFaculty create successfully',
    data: result,
  });
});
// get all academic faculty
const getAllAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB();

  sendResponse(res, {
    statusCode: 500,
    success: true,
    message: 'get all AcademicFaculty  successfully',
    data: result,
  });
});
// get single academic faculty
const getSingleAcademicFaculty: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.userId;
    const result =
      await AcademicFacultyServices.getSingleAcademicFacultyFromDB(id);

    sendResponse(res, {
      statusCode: 500,
      success: true,
      message: 'get single AcademicFaculty  successfully',
      data: result,
    });
  },
);
// update academic faculty
const updateAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.userId;
  const updateData = req.body;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    id,
    updateData,
  );

  sendResponse(res, {
    statusCode: 500,
    success: true,
    message: 'update AcademicFaculty  successfully',
    data: result,
  });
});
export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};

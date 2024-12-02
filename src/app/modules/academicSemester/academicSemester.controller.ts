import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.service';

// create academic semester
const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: 500,
    success: true,
    message: 'academicSemester create successfully',
    data: result,
  });
});
// get all academic semester
const getAllAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();

  sendResponse(res, {
    statusCode: 500,
    success: true,
    message: 'get all academicSemester  successfully',
    data: result,
  });
});
// get single academic semester
const getSingleAcademicSemester: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.userId;
    const result =
      await AcademicSemesterServices.getSingleAcademicSemesterFromDB(id);

    sendResponse(res, {
      statusCode: 500,
      success: true,
      message: 'get single academicSemester  successfully',
      data: result,
    });
  },
);
// update academic semester
const updateAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.userId;
  const updateData = req.body;
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    id,
    updateData,
  );

  sendResponse(res, {
    statusCode: 500,
    success: true,
    message: 'update academicSemester  successfully',
    data: result,
  });
});
export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
};

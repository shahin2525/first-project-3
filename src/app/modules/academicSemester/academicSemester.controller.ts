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
export const AcademicSemesterControllers = {
  createAcademicSemester,
};

import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationServices } from './semesterRegistration.service';
import { StatusCodes } from 'http-status-codes';

// create academic faculty
const createSemesterRegistration: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
        req.body,
      );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'SemesterRegistration create successfully',
      data: result,
    });
  },
);
// get all academic faculty
const getAllSemesterRegistration: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(
        req.query,
      );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'get all SemesterRegistration  successfully',
      data: result,
    });
  },
);
// get single academic faculty
const getSingleSemesterRegistration: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.sRegisterId;
    const result =
      await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(
        id,
      );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'get single SemesterRegistration  successfully',
      data: result,
    });
  },
);
// update academic faculty
const updateSemesterRegistration: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.sRegisterId;
    const updateData = req.body;
    const result =
      await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(
        id,
        updateData,
      );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'update SemesterRegistration  successfully',
      data: result,
    });
  },
);
export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};

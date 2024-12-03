import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartmentServices } from './academicDepartment.service';

// create academic department
const createAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

    sendResponse(res, {
      statusCode: 500,
      success: true,
      message: 'AcademicDepartment create successfully',
      data: result,
    });
  },
);
// get all academic department
const getAllAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();

    sendResponse(res, {
      statusCode: 500,
      success: true,
      message: 'get all AcademicDepartment  successfully',
      data: result,
    });
  },
);
// get single academic department
const getSingleAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.departmentId;
    const result =
      await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(id);

    sendResponse(res, {
      statusCode: 500,
      success: true,
      message: 'get single AcademicDepartment  successfully',
      data: result,
    });
  },
);
// update academic department
const updateAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.departmentId;
    const updateData = req.body;
    const result =
      await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
        id,
        updateData,
      );

    sendResponse(res, {
      statusCode: 500,
      success: true,
      message: 'update AcademicDepartment  successfully',
      data: result,
    });
  },
);
export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};

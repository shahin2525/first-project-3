import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';

import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';
import { StatusCodes } from 'http-status-codes';

const getAllAdmin: RequestHandler = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdmin(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'get all admin successfully',
    data: result,
  });
});
const getSingleAdmin: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AdminServices.getSingleAdmin(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'get single admin successfully',
    data: result,
  });
});

const updateAdmin: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { admin } = req.body;

  // Update the admin in the database
  const result = await AdminServices.updateAdminFromDB(id, admin);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Admin updated successfully',
    data: result,
  });
});
const deleteAdmin: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  // Update the admin in the database
  const result = await AdminServices.deleteAdminFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'delete admin successfully',
    data: result,
  });
});
export const AdminController = {
  // createAdmin,
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};

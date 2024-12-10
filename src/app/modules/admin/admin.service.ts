import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/appError';

import { Admin } from './admin.model';
import { TAdmin } from './admin.interface';
import { User } from '../user/user.model';
import mongoose from 'mongoose';
import { AdminSearchableFields } from './admin.const';

// get all admin
const getAllAdmin = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filterQuery()
    .sorting()
    .paginate()
    .fieldsLimiting();
  const result = await adminQuery.modelQuery;
  return result;
};

// get single admin
const getSingleAdmin = async (id: string) => {
  if (await Admin.UserDoesNotExists(id)) {
    throw new AppError(StatusCodes.NOT_FOUND, 'admin id does not found');
  }
  const result = await Admin.findById(id);
  return result;
};
// update admin
const updateAdminFromDB = async (id: string, payload: Partial<TAdmin>) => {
  if (await Admin.UserDoesNotExists(id)) {
    throw new AppError(StatusCodes.NOT_FOUND, 'admin id does not found');
  }

  const { name, ...remainingData } = payload;

  const modifiedData: Record<string, unknown> = { ...remainingData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

// delete admin

const deleteAdminFromDB = async (id: string) => {
  if (await Admin.UserDoesNotExists(id)) {
    throw new AppError(StatusCodes.NOT_FOUND, 'user id does found');
  }

  //   crete transaction
  const session = await mongoose.startSession();
  try {
    // session.startTransaction();

    // // delete user

    // const deleteAdmin = await Admin.findByIdAndUpdate(
    //   id,
    //   { isDeleted: true },
    //   { new: true, session },
    // );

    // if (!deleteAdmin) {
    //   throw new AppError(StatusCodes.BAD_REQUEST, 'failed to delete admin');
    // }

    // const userId = deleteAdmin.user;

    // const deleteUser = await User.findByIdAndUpdate(
    //   userId,
    //   { isDeleted: true },
    //   { new: true, session },
    // );
    // if (!deleteUser) {
    //   throw new AppError(StatusCodes.BAD_REQUEST, 'failed to delete user');
    // }

    session.startTransaction();

    const deleteAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteAdmin) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'failed to delete admin');
    }

    const userId = deleteAdmin.user;

    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'failed to delete admin user',
      );
    }
    await session.commitTransaction();
    await session.endSession();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const AdminServices = {
  getAllAdmin,
  getSingleAdmin,
  updateAdminFromDB,
  deleteAdminFromDB,
};

import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/appError';
import { FacultySearchableFields } from './faculty.constant';
import { Faculty } from './faculty.model';
import { TFaculty } from './faculty.interface';
import { User } from '../user/user.model';
import mongoose from 'mongoose';

// get all faculty
const getAllFaculty = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate('academicDepartment'),
    query,
  )
    .search(FacultySearchableFields)
    .filterQuery()
    .sorting()
    .paginate()
    .fieldsLimiting();
  const result = await facultyQuery.modelQuery;
  return result;
};

// get single faculty
const getSingleFaculty = async (id: string) => {
  if (await Faculty.doesNotUserExists(id)) {
    throw new AppError(StatusCodes.NOT_FOUND, 'faculty id does not found');
  }
  const result = await Faculty.findById(id);
  return result;
};
// update faculty
const updateFacultyFromDB = async (id: string, payload: Partial<TFaculty>) => {
  if (await Faculty.doesNotUserExists(id)) {
    throw new AppError(StatusCodes.NOT_FOUND, 'faculty id does not found');
  }

  const result = await Faculty.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// delete faculty

const deleteFacultyFromDB = async (id: string) => {
  if (await Faculty.doesNotUserExists(id)) {
    throw new AppError(StatusCodes.NOT_FOUND, 'user id does found');
  }

  //   crete transaction
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // delete user

    const deleteFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteFaculty) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'failed to delete faculty');
    }

    const userId = deleteFaculty.user;

    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'failed to delete user');
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

export const FacultyServices = {
  getAllFaculty,
  getSingleFaculty,
  updateFacultyFromDB,
  deleteFacultyFromDB,
};

import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/appError';
import { TStudent } from './student.interface';
import Student from './student.model';
import mongoose from 'mongoose';
import { User } from '../user/user.model';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // students searchable fields
  const studentsSearchableFields = [
    'email',
    'name.firstName',
    'presentAddress',
  ];
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  // search query
  const searchQuery = Student.find({
    $or: studentsSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  // filtering

  // copy query for filtering

  const queryObj = { ...query };

  // remove partial match fields from query

  const excludes = ['searchTerm', 'sort', 'limit'];

  excludes.forEach((el) => delete queryObj[el]);

  console.log(query, queryObj);
  // filter query
  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  // sort
  let sort = 'createdAt';
  if (query?.sort) {
    sort = query?.sort as string;
  }

  // sort query

  const sortQuery = filterQuery.sort(sort);

  // check limit
  let limit = 1;
  if (query?.limit) {
    limit = query?.limit as number;
  }
  // limit query
  const limitQuery = await sortQuery.limit(limit);

  return limitQuery;
};

const getSingleStudentFromDB = async (id: string) => {
  if (await Student.doesNotUserExists(id)) {
    throw new AppError(StatusCodes.NOT_FOUND, 'user does not exists');
  }
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
const studentUpdateFromDB = async (id: string, payload: Partial<TStudent>) => {
  if (await Student.doesNotUserExists(id)) {
    throw new AppError(StatusCodes.NOT_FOUND, 'user does not exists');
  }
  const { name, guardian, localGuardian, ...remainData } = payload;
  const modifiedData: Record<string, unknown> = { ...remainData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedData[`localGuardian.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedData[`guardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedData, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  if (await User.doesNotUserExists(id)) {
    throw new AppError(StatusCodes.NOT_FOUND, 'user id does not found');
  }
  // create transaction
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // delete user
    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'failed to delete user');
    }
    // user is does not exists
    if (await Student.doesNotUserExists(id)) {
      throw new AppError(StatusCodes.NOT_FOUND, 'student does not exists');
    }
    // delete student
    const deleteStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteStudent) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'failed to delete student');
    }
    await session.commitTransaction();
    await session.endSession();
    return deleteStudent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, error.message);
  }
};

// const studentUpdateFromDB = async (id: string, data: Partial<TStudent>) => {
//   if (await Student.doesNotUserExists(id)) {
//     throw new Error('user does not exists');
//   }
//   const result = await Student.findByIdAndUpdate(
//     id,
//     { $set: data }, // Use `$set` to update only the provided fields
//     { new: true, runValidators: true },
//   );
//   return result;
// };
export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  studentUpdateFromDB,
  deleteStudentFromDB,
};

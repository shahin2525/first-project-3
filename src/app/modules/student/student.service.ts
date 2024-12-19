import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/appError';
import { TStudent } from './student.interface';
import Student from './student.model';
import mongoose from 'mongoose';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentsSearchableFields } from './student.const';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // students searchable fields
  // const studentsSearchableFields = [
  //   'email',
  //   'name.firstName',
  //   'presentAddress',
  // ];
  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // search query
  // const searchQuery = Student.find({
  //   $or: studentsSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // copy query for filtering

  // const queryObj = { ...query };

  // remove partial match fields from query

  // const excludes = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  // excludes.forEach((el) => delete queryObj[el]);

  // console.log('qure', query);
  // console.log('querObg', queryObj);
  // filter query
  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  // sort
  // let sort = 'createdAt';
  // if (query?.sort) {
  //   sort = query?.sort as string;
  // }

  // sort query

  // const sortQuery = filterQuery.sort(sort);

  // check limit
  // let limit = 1;
  // let page = 1;
  // let skip = 0;

  // if (query?.limit) {
  //   limit = Number(query?.limit);
  // }

  // if (query?.page) {
  //   page = Number(query?.page);
  //   skip = (page - 1) * limit;
  // }
  // paginated Query

  // const paginateQuery = sortQuery.skip(skip);

  // limit query
  // const limitQuery = paginateQuery.limit(limit);

  // let fields = '-__v';

  // if (query?.fields) {
  //   console.log('fields', fields);
  //   fields = (query?.fields as string).split(',').join(' ');
  // }
  // console.log('fields', fields);
  // const fieldsQuery = await limitQuery.select(fields);
  // return fieldsQuery;
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('user')
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),

    query,
  )
    .search(studentsSearchableFields)
    .filterQuery()
    .sorting()
    .paginate()
    .fieldsLimiting();
  const result = studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  if (await Student.doesNotUserExists(id)) {
    throw new AppError(StatusCodes.NOT_FOUND, 'user does not exists');
  }
  const result = await Student.findById(id)
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

  const result = await Student.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  // student is does not exists
  if (await Student.doesNotUserExists(id)) {
    throw new AppError(StatusCodes.NOT_FOUND, 'student does not exists');
  }
  // create transaction
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // delete student
    const deleteStudent = await Student.findByIdAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteStudent) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'failed to delete student');
    }

    const userId = deleteStudent.user;

    // delete user
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

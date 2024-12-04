import mongoose from 'mongoose';
import config from '../../config';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import Student from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../error/appError';
import { StatusCodes } from 'http-status-codes';

// create student
const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // if (await Student.doesUserExists(student.id)) {
  //   throw new Error('user already exists');
  // }

  //   at first we have to crete user

  const userData: Partial<TUser> = {};
  userData.password = password || config.default_password;

  // academicSemester info

  const academicSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!academicSemester) {
    throw new Error('academic semester is not found');
  }
  userData.role = 'student';

  // crete transaction
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generate userId
    userData.id = await generateStudentId(academicSemester);
    // create new User

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'user failed to create');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    //   create student
    const result = await Student.create([payload], { session });
    if (!result.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, error.message);
  }
};

export const UserServices = {
  createStudentIntoDB,
};

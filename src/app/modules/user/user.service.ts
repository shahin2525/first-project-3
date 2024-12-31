/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../error/appError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { Admin } from '../admin/admin.model';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { TStudent } from '../student/student.interface';
import Student from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import { sendImageToCloudinary } from '../../utils/sendImageCludinary';

// create student
const createStudentIntoDB = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  // if (await Student.doesUserExists(payload.id)) {
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
  userData.email = payload?.email;

  // crete transaction
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generate userId
    userData.id = await generateStudentId(academicSemester);
    const path = file?.path;

    const imageName = `${userData.id}${payload?.name?.firstName}`;

    const imgUrl = (await sendImageToCloudinary(imageName, path)) || {};

    // if (!secure_url) {
    //   throw new Error('Failed to upload image to Cloudinary');
    // }
    // create new User

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'user failed to create');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    payload.profileImg = imgUrl?.secure_url;

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

// create faculty
const creteFacultyIntoDB = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};
  userData.password = password || config.default_password;
  userData.role = 'faculty';
  userData.email = payload?.email;
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'do not found academic department',
    );
  }
  // create transaction
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    userData.id = await generateFacultyId(); //await generateFacultyId(academicDepartment)

    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'failed to create faculty user',
      );
    }

    // if (Object.keys(newUser).length) {

    payload.id = newUser[0]?.id;
    payload.user = newUser[0]?._id;

    // create faculty

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'failed to crete faculty');
    }

    await session.commitTransaction();
    await session.endSession();
    return newFaculty;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

// create admin

const creteAdminIntoDB = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};
  userData.password = password || config.default_password;
  userData.role = 'admin';
  userData.email = payload?.email;
  // create transaction
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    userData.id = await generateAdminId();

    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'failed to create admin user',
      );
    }

    // if (Object.keys(newUser).length) {

    payload.id = newUser[0]?.id;
    payload.user = newUser[0]?._id;

    // create faculty

    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();
    return newAdmin;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const getMeFromDB = async (userId: string, role: string) => {
  let result = null;

  if (role === 'student') {
    result = await Student.findOne({ id: userId });
  }
  if (role === 'admin') {
    result = await Admin.findOne({ id: userId });
  }
  if (role === 'faculty') {
    result = await Faculty.findOne({ id: userId });
  }

  return result;
};
const changeUserStatusFromDB = async (
  id: string,
  payload: { status: string },
) => {
  console.log(payload);
  // console.log(status);
  const result = await User.findByIdAndUpdate(id, payload, { new: true });

  //   const result = await User.findByIdAndUpdate(id, payload, {
  //  new: true,
  //});
  // console.log(result);
  return result;
};

export const UserServices = {
  createStudentIntoDB,
  creteFacultyIntoDB,

  creteAdminIntoDB,
  getMeFromDB,
  changeUserStatusFromDB,
};

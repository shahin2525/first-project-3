import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/appError';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import AcademicSemester from '../academicSemester/academicSemester.model';

// crete academic faculty
const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  //   if academic semester not exists
  if (!isAcademicSemesterExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'academic semester not exists');
  }

  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });
  //   if  semester registration exists
  if (isSemesterRegistrationExists) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'semester register is already exists',
    );
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};
// get all academic faculty
const getAllSemesterRegistrationFromDB = async () => {
  const result = await SemesterRegistration.find();
  return result;
};
// get all academic faculty
const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};
const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  //   if (await SemesterRegistration.doesFacultyExists(id)) {
  //     throw new AppError(StatusCodes.NOT_FOUND, 'faculty id does not exists');
  //   }
  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};

import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/appError';
import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

// crete academic department
const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};
// get all academic department
const getAllAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};
// get all academic department
const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty');
  return result;
};
const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  if (await AcademicDepartment.doesDepartmentExists(id)) {
    throw new AppError(StatusCodes.NOT_FOUND, 'department id does not exists');
  }
  const result = await AcademicDepartment.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};

import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/appError';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';

// crete academic faculty
const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    faculty,
    course,
  } = payload;
  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);
  // if semester registration is not found
  if (!isSemesterRegistrationExists) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Semester Registration id does not exists',
    );
  }
  const academicSemester = isSemesterRegistrationExists.academicSemester;

  //   if academic faculty does not exists
  const isAcademicFacultyExits =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExits) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Academic Faculty not found !');
  }

  //   const isOfferedCourseExists =
  //     await SemesterRegistration.findById(academicFaculty);

  //   if (!isOfferedCourseExists) {
  //     throw new AppError(
  //       StatusCodes.NOT_FOUND,
  //       'academic faculty id does not exists',
  //     );
  //   }

  const isAcademicDepartmentExits =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExits) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Academic Department not found !',
    );
  }

  const isCourseExits = await Course.findById(course);

  if (!isCourseExits) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Course not found !');
  }

  const isFacultyExits = await Faculty.findById(faculty);

  if (!isFacultyExits) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Faculty not found !');
  }
  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};
// get all academic faculty
const getAllOfferedCourseFromDB = async () => {
  const result = await OfferedCourse.find();
  return result;
};
// get all academic faculty
const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  return result;
};
const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Partial<TOfferedCourse>,
) => {
  //   if (await OfferedCourse.doesFacultyExists(id)) {
  //     throw new AppError(StatusCodes.NOT_FOUND, 'faculty id does not exists');
  //   }
  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
};

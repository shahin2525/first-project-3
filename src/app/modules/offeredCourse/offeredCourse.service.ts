import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/appError';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import hasTimeConflict from './offeredCourse.utils';

// crete academic faculty
const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    faculty,
    course,
    section,
    days,
    startTime,
    endTime,
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
  // if department is not  belong to same faculty
  const isADepartmentBelongToAFaculty = await AcademicDepartment.findOne({
    academicFaculty,
    _id: academicDepartment,
  });
  if (!isADepartmentBelongToAFaculty) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `this ${isAcademicDepartmentExits.name} does not belong to ${isAcademicFacultyExits.name} !`,
    );
  }

  // if same  offered course with same section same registerSemester
  const sameCourseWithSameSectionWithRSemester = await OfferedCourse.findOne({
    semesterRegistration,
    course,
    section,
  });
  if (sameCourseWithSameSectionWithRSemester) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'offered course with same section already exists',
    );
  }

  // if same sRegis and same faculty and same days
  const newSchedule = {
    days,
    startTime,
    endTime,
  };
  const assignSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');
  console.log(assignSchedules);
  if (hasTimeConflict(assignSchedules, newSchedule)) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'This faculty is not available that time , please choose another day or time',
    );
  }
  // assignSchedules.forEach((schedule) => {
  //   const existsStartTime = new Date(`1970-01-01T${schedule.startTime}`);
  //   const existsEndTime = new Date(`1970-01-01T${schedule.endTime}`);
  //   const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`);
  //   const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);
  //   // existsT 10.30 - 12.30
  //   // newT  1.30 - 3.30
  //   // 9.30 - 11.30

  //   if (newStartTime < existsEndTime && newEndTime > existsStartTime) {
  //     throw new AppError(
  //       StatusCodes.CONFLICT,
  //       'This faculty is not available that time , please choose another day or time',
  //     );
  //   }
  // });

  /*
  [
{
    _id: new ObjectId('675fa0afc4872152359f1cfa'),    
    days: [ 'Monday', 'Wednesday' ],
    startTime: '08:30',
    endTime: '11:30'
  }
  ]

  */

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

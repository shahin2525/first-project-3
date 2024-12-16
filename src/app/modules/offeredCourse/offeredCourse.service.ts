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

  if (hasTimeConflict(assignSchedules, newSchedule)) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'This faculty is not available that time , please choose another day or time',
    );
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
  payload: Pick<
    TOfferedCourse,
    'faculty' | 'days' | 'startTime' | 'endTime' | 'maxCapacity'
  >,
) => {
  const { faculty, days, startTime, endTime } = payload;
  // offered course do not found
  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Offered course not found');
  }
  // faculty do not found
  const isFacultyExits = await Faculty.findById(faculty);
  if (!isFacultyExits) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Offered course not found');
  }

  // if semester registration status !== "UPCOMING"
  const semesterRegistration = isOfferedCourseExists?.semesterRegistration;

  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);
  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'semester registration status is not upcoming',
    );
  }
  // if new schedule and assign schedule conflict
  const newSchedule = { days, startTime, endTime };
  const assignSchedules = await OfferedCourse.find({
    semesterRegistration,

    faculty,
    days: { $in: days },
  });

  if (hasTimeConflict(assignSchedules, newSchedule)) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'this faculty is not available for this time please choose another day or time',
    );
  }
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

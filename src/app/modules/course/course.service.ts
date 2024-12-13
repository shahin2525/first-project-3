import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/appError';
import { CourseSearchableFields } from './course.const';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import mongoose from 'mongoose';

// crete academic faculty
const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};
// get all academic faculty
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  // const courseQuery = new QueryBuilder(
  //   Course.find().populate('preRequisiteCourses.course'),
  //   query,
  // )
  //   .search(CourseSearchableFields)
  //   .filterQuery()
  //   .sorting()
  //   .paginate()
  //   .fieldsLimiting();
  // const result = await courseQuery.modelQuery;
  // return result;
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filterQuery()
    .sorting()
    .paginate()
    .fieldsLimiting();

  const result = await courseQuery.modelQuery;
  return result;
};
// get all academic faculty
const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  if (await Course.doesNotCourseExists(id)) {
    throw new AppError(StatusCodes.NOT_FOUND, 'course id does not exists');
  }
  const { preRequisiteCourses, ...remainingUpdatedInfo } = payload;

  // crete transaction
  const session = await mongoose.startSession();

  try {
    const updateBasicInfo = await Course.findByIdAndUpdate(
      id,
      remainingUpdatedInfo,
      {
        new: true,
        runValidators: true,
        session,
      },
    );
    if (!updateBasicInfo) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'failed to update basic course info',
      );
    }

    // if preRequisite exists

    if (preRequisiteCourses && preRequisiteCourses.length) {
      // filter out deleted true field
      const deletedPreRequisiteCourses = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisite = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: {
              course: { $in: deletedPreRequisiteCourses },
            },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!deletedPreRequisite) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          'failed to update delete course info',
        );
      }
      // filter out deleted false field

      const newPreRequisite = preRequisiteCourses.filter(
        (el) => el.course && !el.isDeleted,
      );

      const addNewPreRequisite = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisite } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!addNewPreRequisite) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          'failed to add addNewPreRequisite course',
        );
      }
    }

    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );

    await session.commitTransaction();
    await session.endSession();
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }

  //
};

// delete
const deleteCourseIntoDB = async (id: string) => {
  //   if (await Course.doesFacultyExists(id)) {
  //     throw new AppError(StatusCodes.NOT_FOUND, 'faculty id does not exists');
  //   }
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};
// course faculty assign

const courseFacultyAssignIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
      runValidators: true,
    },
  );
  return result;
};

// course faculty remove

const removeCourseFacultyFromDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};
export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseIntoDB,
  courseFacultyAssignIntoDB,
  removeCourseFacultyFromDB,
};

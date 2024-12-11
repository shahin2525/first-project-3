import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.const';
import { TCourse } from './course.interface';
import { Course } from './course.model';

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
  //   if (await Course.doesFacultyExists(id)) {
  //     throw new AppError(StatusCodes.NOT_FOUND, 'faculty id does not exists');
  //   }
  const result = await Course.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
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
export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseIntoDB,
};

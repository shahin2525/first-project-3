import { Schema, model } from 'mongoose';
import {
  CourseModel,
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourses,
} from './course.interface';

// Define the PreRequisiteCourses Schema
const PreRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  isDeleted: { type: Boolean, default: false },
});

// Define the Course Schema
const CourseSchema = new Schema<TCourse, CourseModel>({
  title: { type: String, unique: true, trim: true, required: true },
  prefix: { type: String, required: true, trim: true },
  code: { type: Number, required: true, trim: true },
  credits: { type: Number, required: true, trim: true },
  isDeleted: { type: Boolean, default: false },
  preRequisiteCourses: [PreRequisiteCoursesSchema],
});

// course faculty schema

const CourseFacultySchema = new Schema<TCourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: true,
    ref: 'Course',
  },

  faculties: [{ type: Schema.Types.ObjectId, ref: 'Faculty' }],
});

// id does not exist
CourseSchema.statics.doesNotCourseExists = async function (id: string) {
  const isFacultyExists = await Course.findById(id);
  return !isFacultyExists;
};

// create faculty model

export const CourseFaculty = model<TCourseFaculty>(
  'CourseFaculty',
  CourseFacultySchema,
);

// Create course Models

export const Course = model<TCourse, CourseModel>('Course', CourseSchema);

import { Schema, model } from 'mongoose';
import { CourseModel, TCourse, TPreRequisiteCourses } from './course.interface';

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

// id does not exist
CourseSchema.statics.doesNotCourseExists = async function (id: string) {
  const isFacultyExists = await Course.findById(id);
  return !isFacultyExists;
};

// Create Models

export const Course = model<TCourse, CourseModel>('Course', CourseSchema);

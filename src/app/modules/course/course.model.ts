import { Schema, model } from 'mongoose';
import { TCourse, TPreRequisiteCourses } from './course.interface';

// Define the PreRequisiteCourses Schema
const PreRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  isDeleted: { type: Boolean, default: false },
});

// Define the Course Schema
const CourseSchema = new Schema<TCourse>({
  title: { type: String, unique: true, trim: true, required: true },
  prefix: { type: String, required: true, trim: true },
  code: { type: Number, required: true, trim: true },
  credits: { type: Number, required: true, trim: true },
  isDeleted: { type: Boolean, default: false },
  preRequisiteCourses: [PreRequisiteCoursesSchema],
});

// Create Models

export const Course = model('Course', CourseSchema);

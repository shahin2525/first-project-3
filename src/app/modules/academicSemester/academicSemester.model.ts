import { Schema, model } from 'mongoose';
import { Code, Months, Name } from './academicSemester.const';
import { TAcademicSemester } from './academicSemester.interface';

const createAcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: Name,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      enum: Code,
      required: true,
    },
    startMonth: {
      type: String,
      enum: Months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: Months,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Create and export the Mongoose model
const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  createAcademicSemesterSchema,
);
// 3. Create a Model.
// const User = model<IUser>('User', userSchema);
export default AcademicSemester;

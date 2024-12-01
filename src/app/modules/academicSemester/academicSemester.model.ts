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
createAcademicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (isSemesterExists) {
    throw new Error('semester is already exists');
  }
  next();
});

// Create and export the Mongoose model
const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  createAcademicSemesterSchema,
);

// 3. Create a Model.

export default AcademicSemester;

import { model, Schema } from 'mongoose';
import { FacultyModel, TAcademicFaculty } from './academicFaculty.interface';
import AppError from '../../error/appError';
import { StatusCodes } from 'http-status-codes';

const academicFacultySchema = new Schema<TAcademicFaculty, FacultyModel>({
  name: { type: String, required: true, unique: true },
});
// if faculty exists
academicFacultySchema.pre('save', async function (next) {
  const isFacultyExists = await AcademicFaculty.findOne({
    name: this.name,
  });
  if (isFacultyExists) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'faculty is already exists');
  }
  next();
});

// if does not faculty exists

// academicFacultySchema.pre('findOneAndUpdate', async function (next) {
//   const query = this.getQuery();
//   const isFacultyExists = await AcademicFaculty.findOne(query);
//   if (!isFacultyExists) {
//     throw new Error('faculty id does not exists');
//   }
//   next();
// });

academicFacultySchema.statics.doesFacultyExists = async function (id: string) {
  const isFacultyExists = await AcademicFaculty.findById(id);
  return !isFacultyExists;
};
// 3. Create a Model.
export const AcademicFaculty = model<TAcademicFaculty, FacultyModel>(
  'AcademicFaculty',
  academicFacultySchema,
);

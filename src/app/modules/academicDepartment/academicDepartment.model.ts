// import { model, Schema } from 'mongoose';
// import { DepartmentModel, TAcademicDepartment } from './AcademicDepartment.interface';

import { model, Schema } from 'mongoose';
import {
  DepartmentModel,
  TAcademicDepartment,
} from './academicDepartment.interface';
import AppError from '../../error/appError';
import { StatusCodes } from 'http-status-codes';

const AcademicDepartmentSchema = new Schema<
  TAcademicDepartment,
  DepartmentModel
>({
  name: { type: String, required: true, unique: true },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicFaculty',
  },
});
// if department exists
AcademicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExists = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExists) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'department is already exists');
  }
  next();
});

// if does not department exists

// AcademicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
//   const query = this.getQuery();
//   const isDepartmentExists = await AcademicDepartment.findOne(query);
//   if (!isDepartmentExists) {
//     throw new Error('department id does not exists');
//   }
//   next();
// });

AcademicDepartmentSchema.statics.doesDepartmentExists = async function (
  id: string,
) {
  const isDepartmentExists = await AcademicDepartment.findById(id);
  return !isDepartmentExists;
};
// 3. Create a Model.
export const AcademicDepartment = model<TAcademicDepartment, DepartmentModel>(
  'AcademicDepartment',
  AcademicDepartmentSchema,
);

import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/appError';
import { TStudent } from './student.interface';
import Student from './student.model';

// const createStudentIntoDB = async (student: TStudent) => {
//   if (await Student.doesUserExists(student.id)) {
//     throw new Error('user already exists');
//   }
//   const result = await Student.create(student);
//   return result;
// };
const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  if (await Student.doesNotUserExists(id)) {
    throw new AppError(StatusCodes.NOT_FOUND, 'user does not exists');
  }
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
const studentUpdateFromDB = async (id: string, data: Partial<TStudent>) => {
  if (await Student.doesNotUserExists(id)) {
    throw new AppError(StatusCodes.NOT_FOUND, 'user does not exists');
  }
  const result = await Student.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  if (await Student.doesNotUserExists(id)) {
    throw new AppError(StatusCodes.NOT_FOUND, 'user does not exists');
  }
  const result = await Student.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};

// const studentUpdateFromDB = async (id: string, data: Partial<TStudent>) => {
//   if (await Student.doesNotUserExists(id)) {
//     throw new Error('user does not exists');
//   }
//   const result = await Student.findByIdAndUpdate(
//     id,
//     { $set: data }, // Use `$set` to update only the provided fields
//     { new: true, runValidators: true },
//   );
//   return result;
// };
export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  studentUpdateFromDB,
  deleteStudentFromDB,
};

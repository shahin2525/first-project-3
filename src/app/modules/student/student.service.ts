import { TStudent } from './student.interface';
import Student from './student.model';

const createStudentIntoDB = async (student: TStudent) => {
  if (await Student.doesUserExists(student.id)) {
    throw new Error('user already exists');
  }
  const result = await Student.create(student);
  return result;
};
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  if (await Student.doesNotUserExists(id)) {
    throw new Error('user does not exists');
  }
  const result = await Student.findById(id);
  return result;
};
const studentUpdateFromDB = async (id: string, data: Partial<TStudent>) => {
  if (await Student.doesNotUserExists(id)) {
    throw new Error('user does not exists');
  }
  const result = await Student.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
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
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  studentUpdateFromDB,
};

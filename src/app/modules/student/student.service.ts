import { TStudent } from './student.interface';
import Student from './student.model';

const createStudentIntoDB = async (student: TStudent) => {
  if (await Student.doesUserExists()) {
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
  if (await Student.doesNotUserExists()) {
    throw new Error('user does not exists');
  }
  const result = await Student.findById(id);
  return result;
};
export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};

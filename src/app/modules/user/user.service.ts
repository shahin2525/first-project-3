import config from '../../config';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import Student from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

// create student
const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // if (await Student.doesUserExists(student.id)) {
  //   throw new Error('user already exists');
  // }

  //   at first we have to crete user

  const userData: Partial<TUser> = {};
  userData.password = password || config.default_password;

  // academicSemester info

  const academicSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!academicSemester) {
    throw new Error('academic semester is not found');
  }
  userData.id = await generateStudentId(academicSemester);

  userData.role = 'student';

  // create new User

  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;
  }

  //   create student
  const result = await Student.create(payload);
  return result;
};

export const UserServices = {
  createStudentIntoDB,
};

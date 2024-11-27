import config from '../../config';
import { TStudent } from '../student/student.interface';
import Student from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

// create student
const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // if (await Student.doesUserExists(student.id)) {
  //   throw new Error('user already exists');
  // }

  //   at first we have to crete user

  const userData: Partial<TUser> = {};
  userData.password = password || config.default_password;
  userData.id = '2030100001 ';
  userData.role = 'student';

  // create new User

  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
  }

  //   create student
  const result = await Student.create(studentData);
  return result;
};

export const UserServices = {
  createStudentIntoDB,
};

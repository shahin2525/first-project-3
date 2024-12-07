import { TAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

export const generateStudentId = async (payload: TAcademicSemester) => {
  const findLastStudentId = async () => {
    const studentId = await User.findOne(
      {
        role: 'student',
      },
      {
        id: 1,
        _id: 0,
      },
    )
      .sort({
        createdAt: -1,
      })
      .lean();
    return studentId?.id ? studentId.id : undefined;
  };

  // if last student id exists

  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4);
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const currentStudentCode = payload.code;
  const currentStudentYear = payload.year;
  if (
    lastStudentId &&
    lastStudentSemesterYear === currentStudentYear &&
    lastStudentSemesterCode === currentStudentCode
  ) {
    currentId = lastStudentId.substring(6);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};

// generate user id
export const generateFacultyId = async (
  payload: TAcademicDepartment,
): Promise<string> => {
  console.log(payload);
  return 'fdfd';
};

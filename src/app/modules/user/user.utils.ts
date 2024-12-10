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

// find last faculty id

const findLastFacultyId = async () => {
  const lastFacultyId = await User.findOne(
    {
      role: 'faculty',
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
  return lastFacultyId?.id ? lastFacultyId.id : undefined;
};

// generate Faculty id
export const generateFacultyId = async (): Promise<string> => {
  const lastFacultyId = await findLastFacultyId();

  let currentId = (0).toString();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `F-${incrementId}`;
  return incrementId;
};
// find last admin id

const findLastAdminId = async () => {
  const lastAdminId = await User.findOne(
    {
      role: 'admin',
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
  return lastAdminId?.id ? lastAdminId.id.substring(2) : undefined;
};
// generate amin id
export const generateAdminId = async () => {
  const lastAdminId = await findLastAdminId();

  let currentId = (0).toString();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `A-${incrementId}`;
  return incrementId;
};

import { TAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  type TAcademicSemesterCodeMapper = {
    [key: string]: string;
  };
  const academicSemesterCodeMapper: TAcademicSemesterCodeMapper = {
    Summer: '01',
    Autumn: '02',
    Fall: '03',
  };
  if (academicSemesterCodeMapper[payload.name] !== payload.code) {
    throw new Error('in valid semester code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};

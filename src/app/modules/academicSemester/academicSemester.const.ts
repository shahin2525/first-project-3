import {
  TAcademicSemesterCodeMapper,
  TCode,
  TMonth,
  TName,
} from './academicSemester.interface';

export const Name: TName[] = ['Autumn', 'Fall', 'Summer'];
export const Code: TCode[] = ['01', '02', '03'];
export const Months: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const academicSemesterCodeMapper: TAcademicSemesterCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

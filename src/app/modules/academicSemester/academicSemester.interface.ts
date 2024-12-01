export type TName = 'Autumn' | 'Fall' | 'Summer';
export type TCode = '01' | '02' | '03';
export type TMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
export type TAcademicSemester = {
  name: TName;
  year: string;
  code: TCode;
  startMonth: TMonth;
  endMonth: TMonth;
};

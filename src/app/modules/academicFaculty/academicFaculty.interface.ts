import { Model } from 'mongoose';

export type TAcademicFaculty = {
  name: string;
};

export interface FacultyModel extends Model<TAcademicFaculty> {
  // eslint-disable-next-line no-unused-vars
  doesFacultyExists(id: string): Promise<TAcademicFaculty | null>;
}

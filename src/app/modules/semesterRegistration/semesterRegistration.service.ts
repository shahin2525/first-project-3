import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/appError';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import AcademicSemester from '../academicSemester/academicSemester.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { RegistrationStatus } from './semesterRegistration.const';

// crete academic faculty
const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  // if semester registration already have upcoming or ongoing status
  const isSemesterRegistrationUpcomingOrOngoingStatus =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });
  if (isSemesterRegistrationUpcomingOrOngoingStatus) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `db has  already had ${isSemesterRegistrationUpcomingOrOngoingStatus.status} semester `,
    );
  }
  const academicSemester = payload?.academicSemester;
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  //   if academic semester not exists
  if (!isAcademicSemesterExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'academic semester not exists');
  }

  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });
  //   if  semester registration exists
  if (isSemesterRegistrationExists) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'semester register is already exists',
    );
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};
// get all academic faculty
const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filterQuery()
    .sorting()
    .paginate()
    .fieldsLimiting();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};
// get all academic faculty
const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');
  return result;
};
const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
  if (!isSemesterRegistrationExists) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'semester-registration id does not exists',
    );
  }

  //   if current semester registration status === ended

  const currentSemesterRegistrationStatus =
    isSemesterRegistrationExists?.status;
  const requestedSemesterRegistrationStatus = payload?.status;
  if (currentSemesterRegistrationStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `semester-registration status is ${currentSemesterRegistrationStatus}`,
    );
  }

  //   if current status upcoming and requested status ended

  if (
    currentSemesterRegistrationStatus === RegistrationStatus.UPCOMING &&
    requestedSemesterRegistrationStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `semester-registration status can not change directly from ${currentSemesterRegistrationStatus} to ${requestedSemesterRegistrationStatus} `,
    );
  }
  //   if current status ongoing and requested status upcoming

  if (
    currentSemesterRegistrationStatus === RegistrationStatus.ONGOING &&
    requestedSemesterRegistrationStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `semester-registration status can not change directly from ${currentSemesterRegistrationStatus} to ${requestedSemesterRegistrationStatus} `,
    );
  }
  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};

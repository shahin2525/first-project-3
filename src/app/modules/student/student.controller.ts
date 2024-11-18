import { NextFunction, RequestHandler } from 'express';
import { StudentServices } from './student.service';

import { StudentValidationSchema } from './student.validation';

const createStudent: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const data = req.body;
    const validatedData = StudentValidationSchema.parse(data);
    const result = await StudentServices.createStudentIntoDB(validatedData);
    res.status(200).json({
      success: true,
      message: 'student create successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAllStudent: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'get all students successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const StudentController = {
  createStudent,
  getAllStudent,
};

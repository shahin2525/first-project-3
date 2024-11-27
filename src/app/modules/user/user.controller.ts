import { NextFunction, RequestHandler } from 'express';
import { UserServices } from './user.service';

// create student
const createStudent: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const { password, student } = req.body;
    // const validatedData = StudentValidationSchema.parse(data);
    const result = await UserServices.createStudentIntoDB(password, student);
    res.status(200).json({
      success: true,
      message: 'student create successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserControllers = {
  createStudent,
};

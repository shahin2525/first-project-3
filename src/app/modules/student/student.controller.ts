import { RequestHandler } from 'express';
import { StudentServices } from './student.service';

const createStudent: RequestHandler = async (req, res) => {
  const data = req.body;
  const result = await StudentServices.createStudentIntoDB(data);
  res.status(200).json({
    success: true,
    message: 'student create successfully',
    data: result,
  });
};

export const StudentController = {
  createStudent,
};

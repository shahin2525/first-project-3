import { NextFunction, RequestHandler } from 'express';
import { StudentServices } from './student.service';

// import { StudentValidationSchema } from './student.validation';

// const createStudent: RequestHandler = async (req, res, next: NextFunction) => {
//   try {
//     const data = req.body;
//     const validatedData = StudentValidationSchema.parse(data);
//     const result = await StudentServices.createStudentIntoDB(validatedData);
//     res.status(200).json({
//       success: true,
//       message: 'student create successfully',
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
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
const getSingleStudent: RequestHandler = async (
  req,
  res,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const result = await StudentServices.getSingleStudentFromDB(id);
    res.status(200).json({
      success: true,
      message: 'get single student successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
// const updateStudent: RequestHandler = async (req, res, next: NextFunction) => {
//   try {
//     const id = req.params.id;

//     const data = req.body;
//     const validatedData = UpdateStudentValidationSchema.parse(data);
//     const result = await StudentServices.studentUpdateFromDB(id, validatedData);
//     res.status(200).json({
//       success: true,
//       message: 'update student successfully',
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
const updateStudent: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    // Update the student in the database
    const result = await StudentServices.studentUpdateFromDB(id, data);

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteStudent: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Update the student in the database
    const result = await StudentServices.deleteStudentFromDB(id);

    res.status(200).json({
      success: true,
      message: 'delete student successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const StudentController = {
  // createStudent,
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};

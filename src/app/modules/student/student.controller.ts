import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
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
const getAllStudent: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();

  sendResponse(res, {
    statusCode: 500,
    success: true,
    message: 'get all students successfully',
    data: result,
  });
});
const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await StudentServices.getSingleStudentFromDB(id);

  sendResponse(res, {
    statusCode: 500,
    success: true,
    message: 'get single student successfully',
    data: result,
  });
});

const updateStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  // Update the student in the database
  const result = await StudentServices.studentUpdateFromDB(id, data);

  sendResponse(res, {
    statusCode: 500,
    success: true,
    message: 'Student updated successfully',
    data: result,
  });
});
const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  // Update the student in the database
  const result = await StudentServices.deleteStudentFromDB(id);

  sendResponse(res, {
    statusCode: 500,
    success: true,
    message: 'delete student successfully',
    data: result,
  });
});
export const StudentController = {
  // createStudent,
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};

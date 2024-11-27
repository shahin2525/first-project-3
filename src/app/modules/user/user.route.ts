import { Router } from 'express';

import { UserControllers } from './user.controller';

const router = Router();
router.post('/create-student', UserControllers.createStudent);
// router.get('/', StudentController.getAllStudent);
// router.get('/:id', StudentController.getSingleStudent);
// router.patch('/:id', StudentController.updateStudent);
// router.delete('/:id', StudentController.deleteStudent);
export const UserRoutes = router;

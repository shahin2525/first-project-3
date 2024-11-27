import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
// student routes
app.use('/api/v1/students/', StudentRoutes);
// user routes
app.use('/api/v1/users/', UserRoutes);
// not found route
app.all('*', (req, res) => {
  res.send('not found route');
});
// global error handler
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: error.message,
    error: error,
  });
});
export default app;

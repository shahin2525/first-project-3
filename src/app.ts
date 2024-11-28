import express from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandlers from './app/middlewares/globalErrorHandlers';
import notFoundRoutes from './app/middlewares/notFoundRoute';
// import { globalErrorHandlers } from './app/middlewares/globalErrorHandlers';
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
// // not found route
// app.all('*', (req, res) => {
//   res.send('not found route');
// });
// global error handler

app.use(globalErrorHandlers);
// not found route
app.use(notFoundRoutes);
export default app;

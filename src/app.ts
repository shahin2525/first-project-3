import cors from 'cors';
import express from 'express';
import globalErrorHandlers from './app/middlewares/globalErrorHandlers';
import notFoundRoutes from './app/middlewares/notFoundRoute';
import router from './app/routes';
// import { globalErrorHandlers } from './app/middlewares/globalErrorHandlers';
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
// student routes
app.use('/api/v1/', router);
// user routes
// app.use('/api/v1/users/', UserRoutes);
// // not found route
// app.all('*', (req, res) => {
//   res.send('not found route');
// });
// global error handler

app.use(globalErrorHandlers);
// not found route
app.use(notFoundRoutes);
export default app;

import cors from 'cors';
import express, { Request, Response } from 'express';
import globalErrorHandlers from './app/middlewares/globalErrorHandlers';
import notFoundRoutes from './app/middlewares/notFoundRoute';
import router from './app/routes';

const app = express();
app.use(cors());
app.use(express.json());
const test = async (req: Request, res: Response) => {
  res.send('Hello World!');
};
app.get('/', test);
// student routes
app.use('/api/v1/', router);

app.use(globalErrorHandlers);
// not found route
app.use(notFoundRoutes);
export default app;

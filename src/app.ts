import cors from 'cors';
import express, { Request, Response } from 'express';
import globalErrorHandlers from './app/middlewares/globalErrorHandlers';
import notFoundRoutes from './app/middlewares/notFoundRoute';
import router from './app/routes';
import cookieParser from 'cookie-parser';
const app = express();
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
    // optionsSuccessStatus: 200,
  }),
);
app.use(express.json());
app.use(cookieParser());
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

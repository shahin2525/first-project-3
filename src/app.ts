import cors from 'cors';
import express from 'express';
import globalErrorHandlers from './app/middlewares/globalErrorHandlers';
import notFoundRoutes from './app/middlewares/notFoundRoute';
import router from './app/routes';

const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
// student routes
app.use('/api/v1/', router);

app.use(globalErrorHandlers);
// not found route
app.use(notFoundRoutes);
export default app;

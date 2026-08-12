import cors from 'cors';
import express, { Application } from 'express';
import path from 'path';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export default app;

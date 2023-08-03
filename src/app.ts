import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRouter from './api/routes';
import bodyParser from 'body-parser';
import { errorHandlers } from './errors';
import './utils/auth/auth-handlers';
import { notFoundHandler } from './errors/not-found';
import { validationErrorHandler } from './errors/validation';

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());

app.use('/api', apiRouter);

// app.use(errorHandlers);
app.use(notFoundHandler);
app.use(validationErrorHandler);

export default app;
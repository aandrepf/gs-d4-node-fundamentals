import { Router } from 'express';
import transactionRouter from './transaction.route';

const routes = Router();

routes.use('/transactions', transactionRouter);

export default routes;

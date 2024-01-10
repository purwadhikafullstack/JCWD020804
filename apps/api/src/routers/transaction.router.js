import { Router } from 'express';
import {
    createTransaction,
  getAllData,
} from '../controllers/transactionController';

const transactionRouter = Router();

// GET
transactionRouter.get('/', getAllData);

// POST
transactionRouter.post('/', createTransaction);

export { transactionRouter };

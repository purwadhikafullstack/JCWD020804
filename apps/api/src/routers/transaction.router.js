import { Router } from 'express';
import {
    createTransaction,
  getAllData,
} from '../controllers/sample.controller';

const transactionRouter = Router();

// GET
transactionRouter.get('/', async (req, res) => {
  const result = await getAllData();
  res.json(result);
});

// POST
transactionRouter.post('/', async (req, res) => {
  await createTransaction();
  res.send('Create Data');
});

export { transactionRouter };

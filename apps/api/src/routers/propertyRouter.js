import { Router } from 'express';
import {
  getAllProperty, getPropertyById,
} from '../controllers/propertyController';

const propertyRouter = Router();

// GET
propertyRouter.get('/', getAllProperty );
propertyRouter.get('/:id', getPropertyById);

export { propertyRouter };
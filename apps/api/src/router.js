import { Router } from 'express';
import { sampleRouter } from './routers/sample.router';
import { userRouter } from './routers/user.router';

const router = Router();

router.get('/', (req, res) => {
  res.send(`Hello, Purwadhika Student !`);
});

router.use('/sample', sampleRouter);
router.use('/user', userRouter);

// add another router here ...

export default router;

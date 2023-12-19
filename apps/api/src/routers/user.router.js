import { Router } from 'express';
import { createUser, keepLogin, login } from '../controllers/user.controller';
import { verifyToken } from '../middleware/auth';

const userRouter = Router();

// GET
// sampleRouter.get('/', async (req, res) => {
//   const result = await getSampleData();
//   res.json(result);
// });

// POST
userRouter.post('/register', async (req, res) => {
  await createUser(req);
  res.send('Account created');
});

userRouter.post('/login', async (req, res) => {
  const result = await login(req);
  res.status(!result.code ? 200 : result.code).send(result);
  console.log('result',result);
});

userRouter.get('/keep-login', verifyToken, keepLogin )


export { userRouter };

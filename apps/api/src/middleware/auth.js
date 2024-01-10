import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({
        message: 'token empty',
      });
    }
    token = token.split(' ')[1];

    let verifiedUser = jwt.verify(token, 'LogIn');

    req.user = verifiedUser;
    console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const checkRole = (req, res, next) => {
  if(req.user.isTenant) {
    return next()
  }
  return res.status(400).send({ message: "Unauthorized (tenant only)"})
}

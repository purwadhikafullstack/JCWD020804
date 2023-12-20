import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    var token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        message: "token empty",
      });
    }
    let verifiedUser = jwt.verify(token, "LogIn");

    req.user = verifiedUser;
    console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
  }


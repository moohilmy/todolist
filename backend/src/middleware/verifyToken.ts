import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
export interface CustomRequest extends Request {
  userToken?: string | object;
}

const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    res.status(403).json({ message: "Authorization header missing" });
    return;
  }

  const token = authToken.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);

    req.userToken = payload;

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
    return;
  }
};

const verifyTokenAndValidateID = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    res.status(403).json({ message: "Authorization header missing" });
    return;
  }
  const token = authToken.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    req.userToken = payload;
    isValidObjectId(payload)
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
    return;
  }
};

export { verifyToken, verifyTokenAndValidateID };

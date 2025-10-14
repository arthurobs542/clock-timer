import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request interface to include 'user'

interface AuthUser {
  role: string;
  [key: string]: unknown;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: AuthUser;
  }
}

const secretKey = process.env.JWT_SECRET || "your_secret_key";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded as AuthUser;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Failed to authenticate token" });
  }
};

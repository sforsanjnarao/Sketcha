import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ message: "No token, unauthorized" });

  try {
    const decoded = jwt.verify(token, "sanjana") as { id: string };
    (req as any).userId = decoded.id; // attach to request
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
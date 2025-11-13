import { User } from "../models/user"; // optional import if you have one

declare global {
  namespace Express {
    interface Request {
      user?: User; // 👈 add your custom field
    }
  }
}
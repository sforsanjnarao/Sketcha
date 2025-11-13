import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const signupController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    // const existingUser = await prisma.user.findUnique({ where: { email } });
    // if (existingUser)
    //   return res.status(400).json({ message: "Email already registered" });

    // const hashPassword = await bcrypt.hash(password, 10);

    // const user = await prisma.user.create({
    //   data: { name, email, password: hashPassword },
    // });
    let user={
        id:1234
    }
    const token = jwt.sign({ id: user.id }, "sanjana", { expiresIn: "1d" });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true, // prevents JS access
      secure: false,  // set to true in production (HTTPS)
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(201).json({
      message: "Account created successfully",
      user: { id: user.id },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const signinController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    // const user = await prisma.user.findUnique({ where: { email } });
    // if (!user) return res.status(404).json({ message: "User not found" });

    // const validPassword = await bcrypt.compare(password, user.password);
    // if (!validPassword)
    //   return res.status(401).json({ message: "Invalid credentials" });
     let user={
        id:1234
    }
    const token = jwt.sign({ id: user.id }, "sanjana", { expiresIn: "1d" });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: { id: user.id },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
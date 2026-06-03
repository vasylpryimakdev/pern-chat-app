import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  res.send("Logged in successfully");
};
export const login = async (req: Request, res: Response) => {
  res.send("Logged out successfully");
};
export const logout = async (req: Request, res: Response) => {
  res.send("Signed up successfully");
};

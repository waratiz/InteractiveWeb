import { Request, Response } from "express";
import { seedUsers } from "../data/seed";

export const showHome = (req: Request, res: Response) => {
  res.render("index", { error: null });
};

export const login = (req: Request, res: Response) => {
  const username = (req.body.username ?? "").toString().trim();
  const password = (req.body.password ?? "").toString();

  const user = seedUsers.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) return res.redirect("/?q=invalid");

  req.session.userId = user.id;
  req.session.username = user.username;

  res.redirect("/todos");
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy(() => res.redirect("/"));
};
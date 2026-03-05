import { Request, Response } from "express";
import { getTodos, addTodo, deleteTodo } from "../data/seed";

export const getTodosPage = (req: Request, res: Response) => {
  const items = getTodos();

  res.render("list", {
    listTitle: "Today",
    items,
    username: req.session.username,
  });
};

export const createTodo = (req: Request, res: Response) => {
  const name = (req.body.newItem ?? "").toString().trim();
  if (name) addTodo(name);
  res.redirect("/todos");
};

export const removeTodo = (req: Request, res: Response) => {
  const id = Number(req.body.checkbox);
  if (!Number.isNaN(id)) deleteTodo(id);
  res.redirect("/todos");
};
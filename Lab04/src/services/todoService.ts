import fs from "fs";
import path from "path";
import { Todo } from "../models/todo";
const dataPath = path.join(process.cwd(), "src", "data", "todo.json");
export function loadTodos(): Todo[] {
  const text = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(text) as Todo[];
}
export function saveTodos(todo: Todo[]): void {
  fs.writeFileSync(dataPath, JSON.stringify(todo, null, 2), "utf-8");
}
export function addTodo(
  todo: Todo[],
  title: string,
  done: boolean
): Todo[] {
  const nextId =
    todo.length === 0 ? 1 : Math.max(...todo.map((s) => s.id)) + 1;
  const newTodo: Todo = { id: nextId, title, done };
  return [...todo, newTodo];
}

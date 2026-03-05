import fs from "fs";
import path from "path";

export const seedUsers = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

const filePath = path.join(process.cwd(), "src/data/todos.json");

export const getTodos = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

const saveTodos = (todos: any[]) => {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
};

export const addTodo = (name: string) => {
  const todos = getTodos();
  const newTodo = { id: Date.now(), name };
  todos.push(newTodo);
  saveTodos(todos);
};

export const deleteTodo = (id: number) => {
  const todos = getTodos();
  const updated = todos.filter((t: any) => t.id !== id);
  saveTodos(updated);
};
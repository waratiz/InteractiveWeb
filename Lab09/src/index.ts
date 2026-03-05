import express from "express";
import path from "path";
import {
  showHome,
  listBooks,
  searchBooks,
  createBook,
  deleteBookHandler
} from "./controllers/bookController";

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(process.cwd(), "public")));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));

app.get("/", showHome);
app.get("/books", listBooks);
app.get("/books/search", searchBooks);
app.post("/books", createBook);
app.post("/books/delete/:bookNo", deleteBookHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

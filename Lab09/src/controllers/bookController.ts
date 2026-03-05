import { Request, Response } from "express";
import { readBooks, addBook } from "../services/fileDb";
import { deleteBook } from "../services/fileDb";

export function showHome(req: Request, res: Response) {
  res.render("home");
}

export function listBooks(req: Request, res: Response) {
  const books = readBooks();
  res.render("books", { books });
}

export function searchBooks(req: Request, res: Response) {
  const name = (req.query.name as string)?.toLowerCase() || "";
  const books = readBooks();

  const filtered = books.filter(b =>
    b.bookName.toLowerCase().includes(name)
  );

  res.render("search", { books: filtered, name });
}

export function createBook(req: Request, res: Response) {
  const bookName = req.body.bookName?.trim();

  if (!bookName) {
    return res.status(400).send("bookName is required");
  }

  addBook(bookName);
  res.redirect("/books");
}

export function deleteBookHandler(req: Request, res: Response) {
  const bookNo = Number(req.params.bookNo);

  if (isNaN(bookNo)) {
    return res.status(400).send("Invalid book number");
  }

  deleteBook(bookNo);
  res.redirect("/books");
}

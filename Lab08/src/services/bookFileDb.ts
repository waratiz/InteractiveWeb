import fs from "fs";
import path from "path";

export type Book = {
  bookNo: number;
  bookName: string;
};

type DbShape = { books: Book[] };

const dbPath = path.join(process.cwd(), "data", "books.json");

// TODO 1: Implement readDb(): DbShape
// - If file not found: create data folder + books.json with { books: [] }
// - Read file text (utf-8) and JSON.parse
function readDb(): DbShape {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(dbPath)) {
    const initialData: DbShape = { books: [] };
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2), "utf-8");
    return initialData;
  }

  // TODO 1
  try {
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data) as DbShape;
  } catch (error) {
    console.error("Error reading items file:", error);
    return { books: [] };
  }
}

// TODO 2: Implement writeDb(db: DbShape)
// - JSON.stringify(db, null, 2) and writeFileSync utf-8
function writeDb(db: DbShape) {
  // TODO 2
  try{
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");
  }catch(error){
    console.error("Error writing items file:", error);
  }
}

export function readBooks(): Book[] {
  // TODO 3: return readDb().books
  return readDb().books; // TODO 3
}

export function addBook(bookName: string): Book {
  // TODO 4:
  // - read db
  const  db = readDb();
  // - find max bookNo
  const maxBookNo =
    db.books.length > 0
      ? Math.max(...db.books.map(b => b.bookNo))
      : 0;
  // - create newBook { bookNo: max+1, bookName }
 const newBook: Book = {
    bookNo: maxBookNo + 1,
    bookName,
  };
  // - push, write db
  db.books.push(newBook);
  writeDb(db);
  // - return newBook
  return newBook; // TODO 4
}

export function deleteBook(bookNo: number): boolean {
  const db = readDb();

  const initialLength = db.books.length;

  db.books = db.books.filter(book => book.bookNo !== bookNo);

  // If length unchanged → book not found
  if (db.books.length === initialLength) {
    return false;
  }

  writeDb(db);
  return true;
}
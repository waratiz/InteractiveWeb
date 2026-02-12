async function loadBooks(search = "") {
  // TODO 13: fetch("/books") and convert to JSON
  const bookList = document.getElementById("book-list");

  try {
    const response = await fetch(`/books?search=${encodeURIComponent(search)}`);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const books = await response.json();
    bookList.innerHTML = "";
    // TODO 14: render books into #book-list
    books.forEach((book) => {
      const div = document.createElement("div");

      const text = document.createElement("span");
      text.textContent = `${book.bookNo}. ${book.bookName}`;

      const button = document.createElement("button");
      button.textContent = "Delete";

      button.addEventListener("click", async () => {
        await fetch(`/books/${book.bookNo}`, {
          method: "DELETE",
        });

        loadBooks(search); 
      });

      div.appendChild(text);
      div.appendChild(button);
      bookList.appendChild(div);
    });

  } catch (error) {
    console.error(error.message);
    bookList.innerHTML = "<p>Error loading books</p>";
  }
}
window.addEventListener("DOMContentLoaded", () => {

  loadBooks();

  document.getElementById("search-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const searchValue = document
        .getElementById("search-input")
        .value
        .trim();

      loadBooks(searchValue);
    });
});



const bookCardContainer = document.querySelector("#books");

let myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = Boolean(isRead);
}

function addBookToLibrary(title, author, pages, isRead) {
    let newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
}

addBookToLibrary("PODS", "Daniel Fitzgerald", "150", true);
addBookToLibrary("The 7 Habits of Highly Effective People", "Dale Carnegie", "160", false);
displayBooks();

function displayBooks() {
    for (const book of myLibrary) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("bookCard");
        
        const title = document.createElement("p");
        bookCard.appendChild(title);
        title.innerText = book.title;
        
        const author = document.createElement("p");
        author.innerText = book.author;
        bookCard.appendChild(author);

        const pages = document.createElement("p");
        pages.innerText = book.pages;
        bookCard.appendChild(pages);

        const isRead = document.createElement("p");
        isRead.innerText = book.isRead;
        bookCard.appendChild(isRead);

        bookCardContainer.appendChild(bookCard);
    }
}
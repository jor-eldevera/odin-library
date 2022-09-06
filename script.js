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

// This function is called by the form on form submission
function addBook() {
    console.log("test");
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const numPages = document.getElementById("numPages");
    const isRead = document.getElementById("isRead");

    addBookToLibrary(title.value, author.value, numPages.value, isRead.checked)
    displayBooks();
}

// This prevents the page from refreshing when submit is clicked
document.getElementById("newBookForm").onsubmit = function(e) {
    e.preventDefault();
};

addBookToLibrary("PODS", "Daniel Fitzgerald", "150", true);
addBookToLibrary("The 7 Habits of Highly Effective People", "Dale Carnegie", "160", false);
displayBooks();

function displayBooks() {
    for (const book of myLibrary) {
        // First check if book is displayed
        let isDisplayed = checkIsDisplayed(book.title);

        // If book is not displayed, add it to the page
        if (isDisplayed === false) {
            const bookCard = document.createElement("div");
            bookCard.classList.add("bookCard");
            
            const title = document.createElement("p");
            title.classList.add("title");
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
}

function checkIsDisplayed(title) {
    const bookTitles = document.getElementsByClassName("title");
    for (let i = 0; i < bookTitles.length; i++) {
        if (title === bookTitles[i].innerText) {
            return true;
        }
    }
    return false;
}
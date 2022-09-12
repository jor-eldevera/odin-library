const bookCardContainer = document.querySelector("#books");

const INDEX_OF_ISREAD = 4; // Index of .isRead in the HTMLCollection returned by bookTitles[i].parentNode.children

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
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const numPages = document.getElementById("numPages");
    const isRead = document.getElementById("isRead");

    addBookToLibrary(title.value, author.value, numPages.value, isRead.checked);
    displayBooks();
}

document.getElementById("newBookForm").onsubmit = function(e) {
    // This prevents the page from refreshing when submit is clicked
    e.preventDefault();

    // This clears the inputs on submit
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const numPages = document.getElementById("numPages");
    const isRead = document.getElementById("isRead");
    title.value = "";
    author.value = "";
    numPages.value = "";
    isRead.checked = false;

    toggleDisplay();
};

addBookToLibrary("PODS", "Daniel Fitzgerald", "150", true);
addBookToLibrary("The 7 Habits of Highly Effective People", "Dale Carnegie", "160", false);
addBookToLibrary("The Game: Penetrating the Secret Society of Pickup Artists", "Neil Strauss", "466", true);
displayBooks();

function displayBooks() {
    for (const book of myLibrary) {
        // First check if book is displayed
        let isDisplayed = checkIsDisplayed(book.title);

        // If book is not displayed, add it to the page
        if (isDisplayed === false) {
            const bookCard = document.createElement("div");
            bookCard.classList.add("bookCard");

            const cardButtons = document.createElement("div");
            cardButtons.classList.add("cardButtons");
            bookCard.appendChild(cardButtons);

            const removeBook = document.createElement("button");
            removeBook.innerText = "Remove";
            removeBook.addEventListener("click", function() {
                removeBookFromDom(book.title);
                removeBookFromArray(book.title);
            });
            removeBook.classList.add("removeBook");
            cardButtons.appendChild(removeBook);

            const changeReadStatus = document.createElement("button");
            changeReadStatus.innerText = "Change Read Status";
            changeReadStatus.addEventListener("click", function() {
                book.isRead = !book.isRead;
                changeReadStatusText(book.title);
            });
            changeReadStatus.classList.add("changeReadStatus");
            cardButtons.appendChild(changeReadStatus);
            
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
            if (book.isRead) {
                isRead.innerText = "Has been read";
            } else {
                isRead.innerText = "Hasn't been read"
            }
            isRead.classList.add("isRead");
            bookCard.appendChild(isRead);
    
            bookCardContainer.appendChild(bookCard);
        }
    }
}

// Checks if a book is displayed
function checkIsDisplayed(title) {
    const bookTitles = document.getElementsByClassName("title");
    for (let i = 0; i < bookTitles.length; i++) {
        if (title === bookTitles[i].innerText) {
            return true;
        }
    }
    return false;
}

// Toggles display of the new book form
function toggleDisplay() {
    const newBookForm = document.getElementById("newBookForm");
    if (newBookForm.style.display === "none") {
        newBookForm.style.display = "block";
      } else {
        newBookForm.style.display = "none";
      }
}

function changeReadStatusText(title) {
    const bookTitles = document.getElementsByClassName("title");
    for (let i = 0; i < bookTitles.length; i++) {
        if (title === bookTitles[i].innerText) {
            let allChildrenOfParent = bookTitles[i].parentNode.children;

            if (allChildrenOfParent[INDEX_OF_ISREAD].innerText === "Has been read") {
                allChildrenOfParent[INDEX_OF_ISREAD].innerText = "Hasn't been read"
            } else {
                allChildrenOfParent[INDEX_OF_ISREAD].innerText = "Has been read";
            }
        }
    }
}

function removeBookFromDom(title) {
    const bookTitles = document.getElementsByClassName("title");
    for (let i = 0; i < bookTitles.length; i++) {
        if (title === bookTitles[i].innerText) {
            bookTitles[i].parentElement.remove();
        }
    }
}

function removeBookFromArray(title) {
    let indexOfBookToRemove = -1;
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === title) {
            indexOfBookToRemove = i;
        }
    }
    myLibrary.splice(indexOfBookToRemove, 1);
}
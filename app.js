//Library Array to store books
let myLibrary = [
  {
    title: 'Example',
    author: 'Joe Mama',
    pages: 100,
    read: true,
  },
];

// book constructor
class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
  }
  readBook() {
    this.read ? false : true;
  }
}

// document selector
const addBookBtn = document.querySelector('.add-book-btn');
const bookInfo = document.querySelectorAll('.book-info');
const bookTable = document.querySelector('.library-table');

// event listener
addBookBtn.addEventListener('click', addBookToLibrary);
addBookBtn.addEventListener('click', displayConsole);
addBookBtn.addEventListener('click', refreshLibraryTable);

// ============function==============
// add book input by user to library Array
function addBookToLibrary() {
  console.log(bookInfo);
  const title = bookInfo[0].value;
  const author = bookInfo[1].value;
  const pages = bookInfo[2].value;
  let newBook = new Book(title, author, pages);
  myLibrary.push(newBook);
}

// display library on page
function refreshLibraryTable() {
  bookTable.innerHTML = '';
  let bookNumber = 0;
  myLibrary.map((book) => {
    const tableRow = document.createElement('tr');
    bookNumber++;
    tableRow.innerHTML = `
      <td>${bookNumber}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.read}</td>
    `;
    bookTable.append(tableRow);
  });
}

// console display ===================
function displayConsole() {
  console.dir(myLibrary);
}

// initialize function for page
refreshLibraryTable();
displayConsole();

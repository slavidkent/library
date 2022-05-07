//Library Array to store books
let myLibrary = [];

// book constructor
class Book {
  constructor(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  readBook() {
    this.read = !this.read;
  }
}

// document selector
const addBookBtn = document.querySelector('.add-book-btn');
const bookInfos = document.querySelectorAll('.book-info');
const bookTable = document.querySelector('.library-table');
const modal = document.querySelector('.modal');
const addBookBtn2 = document.querySelector('.add-book-btn2');
const closeModalBtn = document.querySelector('.close-modal-btn');

// initial event listener
addBookBtn.addEventListener('click', addBookToLibrary);
addBookBtn.addEventListener('click', refreshLibraryTable);

addBookBtn2.addEventListener('click', () => modal.showModal());
closeModalBtn.addEventListener('click', closeModal);

addBookBtn.addEventListener('click', displayConsole);
// ============function==============

function addBookToLibrary() {
  const title = bookInfos[0].value;
  const author = bookInfos[1].value;
  const pages = bookInfos[2].value;
  const read = bookInfos[3].checked;
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function refreshLibraryTable() {
  bookTable.innerHTML = '';
  let bookNumber = 0;
  myLibrary.map((book) => {
    bookNumber++;
    const tableRow = document.createElement('tr');
    const tableData = [];
    for (let i = 0; i < 6; i++) {
      tableData.push(document.createElement('td'));
    }
    const readButton = document.createElement('button');
    readButton.classList.add('read-btn');
    readButton.value = bookNumber;
    readButton.innerHTML = book.read
      ? '<img src="./images/check.svg" alt="check svg">'
      : '<img src="./images/close.svg" alt="close svg">';
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-btn');
    removeButton.value = bookNumber;
    removeButton.innerHTML = "<img src='./images/trash-can.svg' alt='trash can svg'/>";
    tableData[0].textContent = bookNumber;
    tableData[1].textContent = book.title;
    tableData[2].textContent = book.author;
    tableData[3].textContent = book.pages;
    tableData[4].textContent = book.read ? 'Finished' : 'Not read';
    tableData[4].append(readButton);
    tableData[5].append(removeButton);
    for (let i = 0; i < 6; i++) {
      tableRow.append(tableData[i]);
    }
    bookTable.append(tableRow);
    closeModal();
  });

  // ====add event listener to form buttons after library loaded===
  //
  // toggle function of read and not read
  document.querySelectorAll('.read-btn').forEach((button) =>
    button.addEventListener('click', (e) => {
      const bookFormLib = myLibrary[e.currentTarget.value - 1];
      bookFormLib.readBook();
      refreshLibraryTable();
      console.log(myLibrary);
    })
  );
  // remove book from library
  document
    .querySelectorAll('.remove-btn')
    .forEach((button) => button.addEventListener('click', removeBooksFromLibrary));
}

function removeBooksFromLibrary(e) {
  const indexOfBookToRemove = Number(e.currentTarget.value) - 1;
  myLibrary.splice(indexOfBookToRemove, 1);
  refreshLibraryTable();
}

function displayConsole() {
  console.dir(myLibrary);
}

function closeModal() {
  modal.close();
}

// ================initialize page===================
// add an example book
myLibrary.push(new Book('Example', 'Mr.Guy', 123, true));
myLibrary.push(new Book('Joe', 'Mama', 99999, true));
myLibrary.push(new Book('The Superior Devil Race', 'Satan', 666, false));
myLibrary.push(new Book('Overused Hello World', 'Monkey', 5, true));
myLibrary.push(new Book('The Making of Blue Crystal', 'Walter White', 232, false));
refreshLibraryTable();

const STORAGE_KEY = 'BOOKSHELF_APPS';
let books = [];
let searchKeyword = '';

document.addEventListener('DOMContentLoaded', function () {
  const bookForm = document.getElementById('bookForm');
  const searchForm = document.getElementById('searchBook');
  const isCompleteCheckbox = document.getElementById('bookFormIsComplete');
  const submitSpan = document.querySelector('#bookFormSubmit span');

  loadBooksFromStorage();
  renderBooks();

  isCompleteCheckbox.addEventListener('change', function () {
    submitSpan.textContent = this.checked ? 'Selesai dibaca' : 'Belum selesai dibaca';
  });

  bookForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('bookFormTitle').value.trim();
    const author = document.getElementById('bookFormAuthor').value.trim();
    const year = Number(document.getElementById('bookFormYear').value);
    const isComplete = document.getElementById('bookFormIsComplete').checked;

    const newBook = {
      id: new Date().getTime(),
      title: title,
      author: author,
      year: year,
      isComplete: isComplete,
    };

    books.push(newBook);
    saveBooksToStorage();
    renderBooks();
    bookForm.reset();
    submitSpan.textContent = 'Belum selesai dibaca';
  });

  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    searchKeyword = document.getElementById('searchBookTitle').value.trim().toLowerCase();
    renderBooks();
  });
});

function saveBooksToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

function loadBooksFromStorage() {
  const storedBooks = localStorage.getItem(STORAGE_KEY);

  if (storedBooks !== null) {
    books = JSON.parse(storedBooks);
  }
}

function renderBooks() {
  const incompleteBookList = document.getElementById('incompleteBookList');
  const completeBookList = document.getElementById('completeBookList');

  incompleteBookList.innerHTML = '';
  completeBookList.innerHTML = '';

  const filteredBooks = books.filter(function (book) {
    return book.title.toLowerCase().includes(searchKeyword);
  });

  for (const book of filteredBooks) {
    const bookElement = createBookElement(book);

    if (book.isComplete) {
      completeBookList.append(bookElement);
    } else {
      incompleteBookList.append(bookElement);
    }
  }
}

function createBookElement(book) {
  const container = document.createElement('div');
  container.setAttribute('data-bookid', book.id);
  container.setAttribute('data-testid', 'bookItem');

  const titleElement = document.createElement('h3');
  titleElement.setAttribute('data-testid', 'bookItemTitle');
  titleElement.textContent = book.title;

  const authorElement = document.createElement('p');
  authorElement.setAttribute('data-testid', 'bookItemAuthor');
  authorElement.textContent = 'Penulis: ' + book.author;

  const yearElement = document.createElement('p');
  yearElement.setAttribute('data-testid', 'bookItemYear');
  yearElement.textContent = 'Tahun: ' + book.year;

  const buttonContainer = document.createElement('div');

  const toggleButton = document.createElement('button');
  toggleButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
  toggleButton.textContent = book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca';

  toggleButton.addEventListener('click', function () {
    toggleBookStatus(book.id);
  });

  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
  deleteButton.textContent = 'Hapus Buku';

  deleteButton.addEventListener('click', function () {
    deleteBook(book.id);
  });

  const editButton = document.createElement('button');
  editButton.setAttribute('data-testid', 'bookItemEditButton');
  editButton.textContent = 'Edit Buku';

  editButton.addEventListener('click', function () {
    editBook(book.id);
  });

  buttonContainer.append(toggleButton, deleteButton, editButton);
  container.append(titleElement, authorElement, yearElement, buttonContainer);

  return container;
}

function toggleBookStatus(bookId) {
  const bookTarget = books.find(function (book) {
    return book.id === bookId;
  });

  if (bookTarget) {
    bookTarget.isComplete = !bookTarget.isComplete;
    saveBooksToStorage();
    renderBooks();
  }
}

function deleteBook(bookId) {
  books = books.filter(function (book) {
    return book.id !== bookId;
  });

  saveBooksToStorage();
  renderBooks();
}

function editBook(bookId) {
  const bookTarget = books.find(function (book) {
    return book.id === bookId;
  });

  if (!bookTarget) {
    return;
  }

  const newTitle = prompt('Masukkan judul baru:', bookTarget.title);
  const newAuthor = prompt('Masukkan penulis baru:', bookTarget.author);
  const newYear = prompt('Masukkan tahun baru:', bookTarget.year);

  if (newTitle === null || newAuthor === null || newYear === null) {
    return;
  }

  bookTarget.title = newTitle.trim();
  bookTarget.author = newAuthor.trim();
  bookTarget.year = Number(newYear);

  saveBooksToStorage();
  renderBooks();
}
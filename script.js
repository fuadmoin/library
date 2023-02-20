class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}
const addBook = document.getElementById('addBook');
const bookArray = [];
function updateDisplay() {
  const bookList = document.getElementById('bookList');
  let books;
  bookList.innerHTML = '';
  const storedBookList = localStorage.getItem('bookList');
  if (storedBookList) {
    books = JSON.parse(storedBookList);
    books.forEach((book, i) => {
      const dataStr = encodeURIComponent(JSON.stringify(book));
      const bookElement = `<div id='book_${
        i + 1
      }' class="d-flex justify-content-between" >
        <div>
          <p>${book.title}</p>
          <p>${book.author}</p>
        </div>
        <div><button data-book=${dataStr} data-action="remove" >Remove</button></div>
        <div class="border-top"></div>
      </div> `;
      bookList.innerHTML += bookElement;
    });
  }
}

addBook.addEventListener('click', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const book = new Book(title, author);
  bookArray.push(book);
  localStorage.setItem('bookList', JSON.stringify(bookArray));
  updateDisplay();
});

window.onload = () => {
  updateDisplay();
  const container = document.querySelector('#bookList');
  container.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.tagName === 'BUTTON') {
      const button = event.target;
      const removeBook = JSON.parse(decodeURIComponent(button.dataset.book));
      const bookList = localStorage.getItem('bookList');
      const bookArray = JSON.parse(bookList);
      const filter = bookArray.filter(
        (book) => book.title !== removeBook.title
      );
      localStorage.setItem('bookList', JSON.stringify(filter));
      updateDisplay();
    }
  });
};

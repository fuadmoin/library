class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}
const addBook = document.getElementById('addBook');
function updateDisplay() {
  const bookList = document.getElementById('bookList');
  let books;
  bookList.innerHTML = '';
  const storedBookList = localStorage.getItem('bookList');
  if (storedBookList) {
    books = JSON.parse(storedBookList);
    books.forEach((book) => {
      const dataStr = encodeURIComponent(JSON.stringify(book));
      const bookElement = `<div class="d-flex flex-column justify-content-between" >
        <div>
          <div>
            <p>${book.title}</p>
            <p>${book.author}</p>
          </div>
          <div><button data-book=${dataStr} data-action="remove" >Remove</button></div>
        </div>
        <div class="p-1 bg-dark w-100 mt-2 mb-2"></div>
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
  const bookArray = localStorage.getItem('bookList');
  const changedArray = JSON.parse(bookArray);
  changedArray.push(book);
  localStorage.setItem('bookList', JSON.stringify(changedArray));
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
      const books = JSON.parse(bookList);
      const filter = books.filter((book) => book.title !== removeBook.title);
      localStorage.setItem('bookList', JSON.stringify(filter));
      updateDisplay();
    }
  });
};

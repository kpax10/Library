'use strict';

const addBookBtn = document.querySelector('#add-btn');
const modal = document.querySelector('.modal');
const modalBg = document.querySelector('.modal-bg');

addBookBtn.addEventListener('click', () => {
  modal.classList.add('unhide');
  modalBg.classList.add('unhide');
})

function removeModal() {
  modal.classList.remove('unhide');
  modalBg.classList.remove('unhide');
}

document.addEventListener('click', (e) => {
  if (e.target === modalBg) {
    resetForm();
    removeModal();
  }
})

// clear form inputs when exiting modal or when clicking submit
function resetForm() {
  document.querySelector('form').reset();
}



let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}



function addBookToLibrary() {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').checked;

  const book = new Book(title, author, pages, read);

  // validate form
  if (!(title && author && pages)) return
  myLibrary.push(book);
  resetForm();
  removeModal();

  console.log(myLibrary);
}

const submitBookBtn = document.querySelector('#submit-book');
const cardContainer = document.querySelector('.card-container');

function createCard() {
  const card = document.createElement('div');
  cardContainer.appendChild(card).classList.add('card');

  const cardTitle = document.createElement('p');
  card.appendChild(cardTitle);
  cardTitle.textContent = `"${myLibrary[myLibrary.length - 1].title}"`;

  const cardAuthor = document.createElement('p');
  card.appendChild(cardAuthor);
  cardAuthor.textContent = myLibrary[myLibrary.length - 1].author;

  const cardPages = document.createElement('p');
  card.appendChild(cardPages);
  cardPages.textContent = `${myLibrary[myLibrary.length - 1].pages} pages`;

  const cardRead = document.createElement('button');
  card.appendChild(cardRead).classList.add('card-button');
  // cardRead.textContent = myLibrary[myLibrary.length - 1].read ? 'Read' : 'Not read';
  if (myLibrary[myLibrary.length - 1].read) {
    cardRead.textContent = 'Read';
    cardRead.classList.add('read');
  } else {
    cardRead.textContent = 'Not read';
    cardRead.classList.add('not-read');
  }
}

submitBookBtn.addEventListener('click', () => {
  addBookToLibrary();
  createCard();
});

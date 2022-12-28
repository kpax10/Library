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

function resetForm() {
  document.querySelector('form').reset();
}

let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  readStatus() {
    return this.read ? this.read = false : this.read = true;
  }
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
  createCard();
}

const submitBookBtn = document.querySelector('#submit-book');
const cardContainer = document.querySelector('.card-container');

function createCard() {
  const card = document.createElement('div');
  cardContainer.appendChild(card).classList.add('card');
  card.setAttribute('data-value', myLibrary[myLibrary.length - 1].title); // set data attribute as book title

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
  if (myLibrary[myLibrary.length - 1].read) {
    cardRead.textContent = 'Read';
    cardRead.classList.add('read');
  } else {
    cardRead.textContent = 'Not read';
    cardRead.classList.add('not-read');
  }
  cardRead.addEventListener('click', changeReadStatus);

  const remove = document.createElement('button');
  card.appendChild(remove).textContent = 'Remove';
  remove.classList.add('remove');
  remove.addEventListener('click', removeCard)
}

submitBookBtn.addEventListener('click', (event) => {
  event.preventDefault();
  addBookToLibrary();
});

function removeCard(event) {
  let card = event.currentTarget.parentNode;
  let cardDataAttr = card.dataset.value;
  card.remove();
  let itemIndex = myLibrary.indexOf(cardDataAttr);
  myLibrary.splice(itemIndex, 1);
}

function changeReadStatus(event) {
  let card = event.currentTarget.parentNode;
  let cardDataAttr = card.dataset.value;
  let nodeArray = Array.from(document.querySelectorAll('.card'));

  let index;
  for (let i = 0; i <= nodeArray.length - 1; i++) {
    if (nodeArray[i].dataset.value === cardDataAttr) index = i;
  }
  myLibrary[index].readStatus();

  let readButton = event.currentTarget
  if (readButton.classList.contains('read')) {
    readButton.classList.remove('read');
    readButton.classList.add('not-read');
    readButton.textContent = 'Not read';
  } else {
    readButton.classList.remove('not-read')
    readButton.classList.add('read');
    readButton.textContent = 'Read';
  }
}
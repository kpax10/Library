'use strict';

const addBookBtn = document.querySelector('#add-btn');
const modal = document.querySelector('.modal');
const modalBg = document.querySelector('.modal-bg')

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
    removeModal();
    resetForm();
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

submitBookBtn.addEventListener('click', (addBookToLibrary));
'use strict';

const addBookBtn = document.querySelector('#add-btn');
const modal = document.querySelector('.modal');
const modalBg = document.querySelector('.modal-bg')

addBookBtn.addEventListener('click', () => {
  modal.classList.add('unhide');
  modalBg.classList.add('unhide');
})

document.addEventListener('click', (e) => {
  if (e.target === modalBg) {
    modal.classList.remove('unhide');
    modalBg.classList.remove('unhide');
  }
})







let myLibrary = [];


function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBookToLibrary() {


  myLibrary.push(getBook)
}
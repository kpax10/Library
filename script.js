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

  const remove = document.createElement('button');
  card.appendChild(remove).textContent = 'Remove';
  remove.classList.add('remove');
}

let removeButtons = document.querySelectorAll('.remove');

submitBookBtn.addEventListener('click', () => {
  event.preventDefault();
  addBookToLibrary();
  removeButtons = document.querySelectorAll('.remove');
  removeButtonListener();
});


function removeButtonListener() {
  let userInput;
  removeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      // event.stopPropagation();
      let item = event.currentTarget.parentNode;
      return userInput = item.dataset.value;
      console.log('user input:', userInput);
      item.remove();
      // let itemIndex = myLibrary.indexOf(userInput); // this is not working properly.
      // console.log(itemIndex)
      // myLibrary.splice(itemIndex, 1);
      console.log(myLibrary);
      return userInput;
    })
  })
}



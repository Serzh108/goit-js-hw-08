// 'use strict';
import galleryData from './gallery-items.js'
// ==== rendering Markup ====
const refs = {
  mainList: document.querySelector('.js-gallery'),
  modalBlock: document.querySelector('.js-lightbox'),
 lightboxImage: document.querySelector('.lightbox__image'),
}

let currentItem;

function renderMarkup(array) {
  const listMarkup = array.map( item => {
    return `<li class="gallery__item">
    <a
      class="gallery__link"
      href=${item.original}
    >
      <img
        class="gallery__image"
        src=${item.preview}
        data-source=${item.original}
        alt=${item.description}
      />
    </a>
  </li>`
  }).join('');

  return listMarkup;
}

refs.mainList.insertAdjacentHTML('afterbegin', renderMarkup(galleryData));

// ====== Control =====
refs.mainList.addEventListener('click', clickMainList);

function clickMainList(e) {
  e.preventDefault();
  currentItem = e.target.closest('li');
  refs.modalBlock.classList.toggle('is-open'); // add
  if (e.target.dataset.source) {
    refs.lightboxImage.src = e.target.dataset.source;
  } 
  addEscListener();
  refs.modalBlock.addEventListener('click', clickModalBlock);
}

function clickModalBlock(e) {
  if (e.target.nodeName === 'IMG')  return;
  closeModal();
}

function addEscListener() {
  window.addEventListener('keydown', pressEsc);   
}

function pressEsc({code}) { 
  if (code === 'Escape') {
    closeModal();
  }else if(code === 'ArrowLeft') {
    moveLeft();
  }else if(code === 'ArrowRight') {
    moveRight();
  }      
  return;
}

function closeModal() { 
  refs.modalBlock.classList.toggle('is-open'); // remove 
  refs.lightboxImage.src = '';
  window.removeEventListener('keydown', pressEsc);  
  refs.modalBlock.removeEventListener('click', clickModalBlock);
}

function moveRight() {
  if (currentItem !== refs.mainList.lastChild) { 
    currentItem = currentItem.nextSibling; 
  }else { currentItem = refs.mainList.firstChild; }
  refs.lightboxImage.src = currentItem.firstElementChild.href;
}

function moveLeft() {
  if (currentItem !== refs.mainList.firstChild) { 
    currentItem = currentItem.previousSibling;
  }else { currentItem = refs.mainList.lastChild; }
  refs.lightboxImage.src = currentItem.firstElementChild.href;
}

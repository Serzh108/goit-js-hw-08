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
  if (e.target === e.currentTarget) { return }
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

function pressEsc(e) { 
  e.preventDefault();
  if (e.code === 'Escape') {
    closeModal();
  }else if(e.code === 'ArrowLeft') {
    moveLeft();
  }else if(e.code === 'ArrowRight') {
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
  currentItem = (currentItem !== refs.mainList.lastChild) ? currentItem.nextSibling : refs.mainList.firstChild;
  refs.lightboxImage.src = currentItem.firstElementChild.href;
}

function moveLeft() {
  currentItem = (currentItem !== refs.mainList.firstChild) ? currentItem.previousSibling : refs.mainList.lastChild;
  refs.lightboxImage.src = currentItem.firstElementChild.href;
}

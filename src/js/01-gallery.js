// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export default function generateGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => `
      <div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            alt="${description}"
          />
        </a>
      </div>
    `)
    .join('');
}

const galleryContainer = document.querySelector('.gallery');

function renderGallery(items) {
  galleryContainer.insertAdjacentHTML('beforeend', generateGalleryMarkup(items));
}

function createLightbox() {
  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });
  return lightbox;
}

renderGallery(galleryItems);
createLightbox();
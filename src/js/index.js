import axios from 'axios';
import { toggleVisibility, showMessage } from './helpers.js';

const loadMoreButton = document.querySelector('.load-more-button');
const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

const apiKy = '44510469-6a54537c1d88a141b8cb4f82a';
const baseUrl = 'https://pixabay.com/api/';
const paginationConfig = {
  currentPage: 0,
  itemsPerPage: 40,
};

searchForm.addEventListener('submit', onFormSubmit);
loadMoreButton.addEventListener('click', onLoadMore);

function getSearchQuery() {
  return searchForm.elements.searchQuery.value.trim();
}

async function onFormSubmit(e) {
  e.preventDefault();
  paginationConfig.currentPage = 1;
  const searchQuery = getSearchQuery();
  gallery.innerHTML = '';
  toggleVisibility(loadMoreButton, true);
  if (!searchQuery) {
    showMessage('Please fill in search query!', true);
    return;
  }
  try {
    const apiResponse = await getImages(searchQuery);
    if (!apiResponse.hits.length) {
      showMessage(
        'Sorry, there are no images matching your search query. Please try again.',
        true
      );
      toggleVisibility(loadMoreButton, true);
      return;
    } else {
      showMessage(`Hooray! We found ${apiResponse.totalHits} images.`, false);
      if (
        paginationConfig.currentPage * paginationConfig.itemsPerPage >=
        Math.min(apiResponse.total, apiResponse.totalHits)
      ) {
        toggleVisibility(loadMoreButton, true);
      } else {
        toggleVisibility(loadMoreButton, false);
      }
      gallery.insertAdjacentHTML('beforeend', buildGallery(apiResponse.hits));
    }
  } catch (error) {
    showMessage('Something went wrong!', true);
  }
}

async function getImages(searchQuery) {
  const queryString = new URLSearchParams({
    page: paginationConfig.currentPage,
    per_page: paginationConfig.itemsPerPage,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    key: apiKy,
    q: searchQuery,
  });
  const { data } = await axios.get(`${baseUrl}?${queryString}`);
  return data;
}

async function onLoadMore() {
  try {
    paginationConfig.currentPage = paginationConfig.currentPage + 1;
    const searchQuery = getSearchQuery();
    const apiResponse = await getImages(searchQuery);
    if (
      paginationConfig.currentPage * paginationConfig.itemsPerPage >=
      Math.min(apiResponse.total, apiResponse.totalHits)
    ) {
      stopLoadMore();
    }
    gallery.insertAdjacentHTML('beforeend', buildGallery(apiResponse.hits));
  } catch (error) {
    showMessage('Something went wrong!', true);
  }
}

function stopLoadMore() {
  toggleVisibility(loadMoreButton, true);

  if (gallery.children.length > 0) {
    showMessage(
      "We're sorry, but you've reached the end of search results.",
      true
    );
  }
}

function buildGallery(images) {
  return images
    .map(({ previewURL, tags, likes, views, comments, downloads }) => {
      return `
   <div class="photo-card">
  <img
    class="gallery-img"
    src="${previewURL}"
    alt="${tags}"
    width="240"
    height="140"
  />
  <div class="info">
    <div class="info-item">
      <h3>Likes</h3>
      <p>${likes}</p>
    </div>
    <div class="info-item">
      <h3>Views</h3>
      <p>${views}</p>
    </div>
    <div class="info-item">
      <h3>Comments</h3>
      <p>${comments}</p>
    </div>
    <div class="info-item">
      <h3>Downloads</h3>
      <p>${downloads}</p>
    </div>
  </div>
</div>`;
    })
    .join('');
}

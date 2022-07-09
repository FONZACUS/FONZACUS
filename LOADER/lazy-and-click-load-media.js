// ==UserScript==
// @name Lazy & Click Load Media
// @namespace AI
// @version 0
// @description Lazy load and click to load media
// @match *://*/*
// @grant none
// ==/UserScript==
(function() {
'use strict';
const lazyLoad = () => {
const lazyImages = document.querySelectorAll('img[data-src], audio[data-src], video[data-src], iframe[data-src]');
const loadImage = (image) => {
image.src = image.dataset.src;
image.classList.remove('lazy');
image.removeEventListener('click', lazyLoadClickHandler); // Remove click event after lazy loading
};
const lazyLoadClickHandler = () => {
loadImage(this);
};
const imageObserver = new IntersectionObserver((entries, observer) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
loadImage(entry.target);
observer.unobserve(entry.target);
}
});
});
lazyImages.forEach(image => {
image.addEventListener('click', lazyLoadClickHandler);
imageObserver.observe(image);
});
};
// Load images on initial page load
lazyLoad();
// Load images on window resize
window.addEventListener('resize', lazyLoad);
})();
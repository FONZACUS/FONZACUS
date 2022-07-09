// ==UserScript==
// @name Click to Load Media
// @namespace AI
// @version 0
// @description Click to load media elements on the page
// @match *://*/*
// @grant none
// ==/UserScript==
(function() {
'use strict';
const mediaElements = document.querySelectorAll('img[data-src], audio[data-src], video[data-src], iframe[data-src]');
mediaElements.forEach(element => {
element.addEventListener('click', () => {
if (element.tagName === 'IMG') {
element.src = element.dataset.src;
delete element.dataset.src; // Optional: Remove data-src after loading
} else if (element.tagName === 'AUDIO') {
element.src = element.dataset.src;
delete element.dataset.src; // Optional: Remove data-src after loading
} else if (element.tagName === 'VIDEO') {
element.src = element.dataset.src;
delete element.dataset.src; // Optional: Remove data-src after loading
} else if (element.tagName === 'IFRAME') {
element.src = element.dataset.src;
delete element.dataset.src; // Optional: Remove data-src after loading
}
});
});
})();
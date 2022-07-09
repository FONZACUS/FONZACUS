// ==UserScript==
// @name bloxite
// @namespace github/fonzacus
// @author FONZACUS
// @description SITE BLOCK
// @version 0.1
// @updateURL https://github.com/FONZACUS/FONZACUS/raw/userscript/bloxite.js
// @run-at document-start
// @noframe
// @match *://*/*
// @match *
// @include *
// @exclude *://*tube*/*
// @license WTFPL
// ==/UserScript==
(function() {
const blockSite = [
"example.com",
];
const currentSite = window.location.hostname; 
if (blockSite.includes(currentSite)) {
window.stop();
}
})();
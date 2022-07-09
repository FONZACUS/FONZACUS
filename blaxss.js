// ==UserScript==
// @name blaxss
// @namespace github/fonzacus
// @author FONZACUS
// @description slightly more aggressive dark mod
// @version 0.2
// @updateURL https://github.com/FONZACUS/FONZACUS/raw/userscript/blaxss.js
// @run-at document-start
// @noframe
// @match *://*/*
// @match *
// @include *
// @exclude *://*tube*/*
// @license WTFPL
// ==/UserScript==

(function () {
'use strict';
const css = `

*,::after,::before
{
color-scheme:dark!important;
color:#fff!important;
background-color:#000!important;
border-color:#222!important;
outline-color:#555!important;
text-shadow:none!important;
box-shadow:none!important;
-moz-box-shadow:none!important;
}

button,label,input
{
color:#eee!important;
border:solid!important;
border-color:#555!important;
border-width:1px!important;
}

img,section,span,::after,::before,
div:not([id*="image"]):not([class*="button"]):not([role*="button"]):not([id*="bar"]):not([id*="head"]):not([class*="drop"]):not([class*="menu"]):not([class*="Flyout"]):not([class*="dialog"]):not([class*="float"]):not([class*="window"]):not([class*="lift"]):not([class*="bar"]):not([role*="banner"]):not([role*="bubble"]):not([role*="hover"]):not([role*="dialog"]):not([class*="grip"]):not([class*="flyout"]):not([class*="btn"]):not([class*="RES"]):not([id*="RES"]):not([class="locationPane"]):not([class="pdfViewer"]):not([class*="thumbnail"]):not([class*="toggle"]):not([id*="table"]):not([role*="slider"]):not([class="_3ghu"]):not([class*="progress"]):not([class*="buffer"]):not([id*="preview"])
{background-color:transparent!important}
body{background-image:none!important}

a:link{color:#aaf!important}
a:visited{color:#faf!important}

`;

const style = document.createElement('style');
style.id = 'blaxss';
style.textContent = css;
const target = document.head || document.documentElement;
if (target) {
target.appendChild(style);
} else { document.addEventListener('DOMContentLoaded', () => {
(document.head || document.documentElement).appendChild(style);
});
}
})();
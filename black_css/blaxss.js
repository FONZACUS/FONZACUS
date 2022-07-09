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

:root,body

/* doesnt work?
:not(
application,audio,example,font,image,model,video,
area,canvas,source,media,embed,iframe,object,portal,
img,svg,picture,track
)
:not(
area,audio,img,map,track,video,
embed,fencedframe,iframe,object,picture,source,
svg,math,canvas
)*/

{
color-scheme:dark!important;
background:#000!important;
background-color:#000!important;
color:#fff!important;
}
a:link{color:#aaf!important}
a:visited{color:#faf!important}

/*
area,audio,img,map,track,video,
embed,fencedframe,iframe,object,picture,source,
svg,math,canvas
{background:none!important;background-color:none!important}
*/
`;

const style = document.createElement('style');
style.id = 'blaxss';
style.textContent = css;

const target = document.head || document.documentElement;
if (target) {
target.appendChild(style);
} else {   document.addEventListener('DOMContentLoaded', () => {
(document.head || document.documentElement).appendChild(style);
});
}
})();
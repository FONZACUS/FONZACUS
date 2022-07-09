// ==UserScript==
// @name bloxpop
// @namespace github/fonzacus
// @author FONZACUS
// @description block pop up, under, redirect, history hijack, open in app
// @version 0.1
// @updateURL https://github.com/FONZACUS/FONZACUS/raw/userscript/bloxpop.js
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

// 1. APP SCHEME & DEEP-LINK REDIRECT BLOCKER
const BLOCKED_SCHEMES = [
'intent:',
'market:',
'itms-apps:',
'itmss:',
'app:',
'reddit:',
'twitter:',
'instagram:',
'tiktok:'
];

function isAppScheme(url) {
if (!url) return false;
const strUrl = String(url).toLowerCase();
return BLOCKED_SCHEMES.some(scheme => strUrl.startsWith(scheme)) ||
(strUrl.includes('play.google.com/store/apps') && !window.event?.isTrusted) ||
(strUrl.includes('apps.apple.com') && !window.event?.isTrusted);
}

// Intercept programmatic location changes
const originalAssign = window.location.assign;
const originalReplace = window.location.replace;

window.location.assign = function (url) {
if (isAppScheme(url)) {
console.warn('[Anti-Hijack] Blocked App Redirect via location.assign:', url);
return;
}
return originalAssign.apply(this, arguments);
};

window.location.replace = function (url) {
if (isAppScheme(url)) {
console.warn('[Anti-Hijack] Blocked App Redirect via location.replace:', url);
return;
}
return originalReplace.apply(this, arguments);
};

// 2. BLOCK POPUPS & POPUNDERS (window.open)
const originalOpen = window.open;

window.open = function (url, name, specs) {
// Block non-user-triggered popups or deep-link app opens
if (!window.event || !window.event.isTrusted || isAppScheme(url)) {
console.warn('[Anti-Hijack] Blocked un-trusted window.open / App launch:', url);
return null;
}

const newWindow = originalOpen.apply(this, arguments);
if (newWindow) {
try {
// Mitigate popunder focus-swapping tricks
newWindow.focus();
} catch (e) {
// Cross-origin access restrictions may apply
}
}
return newWindow;
};

// 3. BLOCK HISTORY HIJACKING (Back Button Trap)
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

let lastHistoryChange = 0;
const HISTORY_COOLDOWN_MS = 500; // Throttles rapid non-trusted state injections

history.pushState = function (state, title, url) {
const now = Date.now();
if (now - lastHistoryChange < HISTORY_COOLDOWN_MS && !window.event?.isTrusted) {
console.warn('[Anti-Hijack] Blocked rapid history pushState:', url);
return;
}
lastHistoryChange = now;
return originalPushState.apply(this, arguments);
};

history.replaceState = function (state, title, url) {
const now = Date.now();
if (now - lastHistoryChange < HISTORY_COOLDOWN_MS && !window.event?.isTrusted) {
console.warn('[Anti-Hijack] Blocked rapid history replaceState:', url);
return;
}
lastHistoryChange = now;
return originalReplaceState.apply(this, arguments);
};

window.addEventListener('popstate', function () {
lastHistoryChange = Date.now();
}, true);

// 4. BLOCK UNLOAD TRAPS (Leave Site Dialogs)
Object.defineProperty(window, 'onbeforeunload', {
get: () => null,
set: () => {
console.warn('[Anti-Hijack] Suppressed onbeforeunload trap assignment.');
},
configurable: false
});

// 5. INTERCEPT BLANK-TARGET HIJACKS & DOM IFRAMES
// Prevent reverse tabnabbing on target="_blank" links
document.addEventListener('click', function (event) {
let target = event.target;
while (target && target.tagName !== 'A') {
target = target.parentElement;
}

if (target && target.tagName === 'A') {
if (target.getAttribute('target') === '_blank') {
target.setAttribute('rel', 'noopener noreferrer');
}
}
}, true);

// Dynamic element observer for hidden deep-link iframes & "Open in App" banners
const BANNER_SELECTORS = [
'[class*="open-in-app"]',
'[id*="open-in-app"]',
'[class*="OpenInApp"]',
'amp-app-banner',
'.smartbanner',
'.app-prompt',
'[aria-label*="Open in App"]'
];

function cleanupAppBanners() {
BANNER_SELECTORS.forEach(selector => {
document.querySelectorAll(selector).forEach(el => {
el.remove();
// Restore scroll capability if blocked by an overlay wrapper
if (document.body) document.body.style.overflow = 'auto';
if (document.documentElement) document.documentElement.style.overflow = 'auto';
});
});
}

const observer = new MutationObserver((mutations) => {
for (const mutation of mutations) {
for (const node of mutation.addedNodes) {
// Remove stealth deep-link iframe injections
if (node.tagName === 'IFRAME' && isAppScheme(node.src)) {
console.warn('[Anti-Hijack] Removed deep-link iframe:', node.src);
node.remove();
}
}
}
cleanupAppBanners();
});

observer.observe(document.documentElement, { childList: true, subtree: true });

document.addEventListener('DOMContentLoaded', cleanupAppBanners);
})();
// ==UserScript==
// @name        Generic Dark Theme
// @description Force dark theme on matching websites
// @version     1.0
// @author      jH-
// @namespace   https://github.com/jH-/userscripts
// @match       *.finn.no/*
// @grant       none
// @downloadURL https://github.com/jH-/userscripts/blob/master/generic-dark-theme.user.js
// @updateURL   https://github.com/jH-/userscripts/blob/master/generic-dark-theme.user.js
// ==/UserScript==

(function() {
    'use strict';

    function applyDarkMode() {
        const style = document.createElement('style');
        style.textContent = `
            html {
                background-color: #121212;
            }

            body {
                filter: hue-rotate(180deg) invert(100%);
            }

            iframe, img, video, canvas {
                filter: invert(100%) hue-rotate(180deg) !important;
            }
            
            /* Improve contrast on icons. */
            .icon {
                filter: invert(15%) hue-rotate(180deg);
            }

            pre {
                filter: invert(6%);
            }
            
            /* Improve contrast on text. */
            span, button {
                font-weight: lighter !important;
                letter-spacing: 0.7px ;
            }

            /* Improve contrast on list item markers. */
            li::marker {
                color: #666;
            }
        `;
        document.head.appendChild(style);
    }

    const observer = new MutationObserver((mutations, obs) => {
        if (document.readyState === 'complete') {
            applyDarkMode();
            obs.disconnect();
        }
    });

    observer.observe(document, {
        childList: true,
        subtree: true
    });
})();
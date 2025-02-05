// ==UserScript==
// @name        Hide Azure DevOps projects
// @version     1.0
// @description Hides user-selected projects from an organizations project overview landing-page
// @author      jH-
// @include     /^https:\/\/(dev\.azure\.com\/[a-zA-Z0-9][a-zA-Z0-9-]{0,48}[a-zA-Z0-9](\/)?|[a-zA-Z0-9][a-zA-Z0-9-]{0,48}[a-zA-Z0-9]\.visualstudio\.com(\/)?)$
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_registerMenuCommand
// ==/UserScript==

// This script was created as a workaround for the lack of project archiving or deprecation features in Azure DevOps.

(function() {
    'use strict';

    function setProjects() {
        const projects = prompt('Enter the exact names of the project(s) you\'d like to hide, seperated by commas:', GM_getValue('projects'));
        if (projects !== null) {
            GM_setValue('projects', projects);
            alert('Saved; reload the page to apply changes');
            console.log('Saved setting: ', projects);
        }
    }

    GM_registerMenuCommand('Set projects to hide', setProjects);

    let projectTitles;
    const projects = GM_getValue('projects');
    if (!projects || projects === '') {
        setProjects();
        return;
    } else {
        projectTitles = projects.split(/\s*,\s*/);
    }

    function removeElement(item) {
        let tbox = document.querySelector("div[aria-label='" + item + "']").closest('li');
        if (tbox) tbox.remove();
        let trow = document.querySelector("div[aria-label='" + item + "']").closest('tr');
        if (trow) trow.remove();
    }

    let observer = new MutationObserver((mutations, obs) => {
        projectTitles.forEach(removeElement);
        obs.disconnect();
    });

    observer.observe(document, {
        childList: true,
        subtree: true
    });
})();
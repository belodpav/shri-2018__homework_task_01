'use strict';
/**
 * Returns DOM element by selector
 * wrapper on querySelector
 * @param {String} selector
 * @param {Node} scope
 * @return {Node} 
 */
function qs(selector, scope) {
    return (scope || document).querySelector(selector);
}
/* globals clearTimeout, setTimeout */

// http://davidwalsh.name/javascript-debounce-function
export const debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// event delegation
// similar to $.closest
// so we can traverse up the tree for delegation
// http://stackoverflow.com/questions/22100853/dom-pure-javascript-solution-to-jquery-closest-implementation
export const closest = (el, fn) => {
    return el && (
        fn(el) ? el : closest(el.parentNode, fn)
    )
}

export const random = (min, max) => {
    return parseInt( Math.random() * (max - min) + min, 10);
}

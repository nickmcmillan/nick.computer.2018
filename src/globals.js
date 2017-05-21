/* globals document, window, navigator */
const userAgent = navigator.userAgent
const isIE = userAgent.indexOf('MSIE ') > -1 || userAgent.indexOf('Trident/') > -1

export default {
    doc: document,
    animating: undefined,
    ballArr: [],
    isIE: isIE,
    w: window.innerWidth,
    h: window.innerHeight,
    get svgEl() {
        // http://stackoverflow.com/a/4616262
        return this.doc.getElementById('svg-el');
    }
}

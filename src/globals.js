/* globals document, window, navigator */

const isShit = () => {
  if (/MSIE 10/i.test(navigator.userAgent)) {
    // This is internet explorer 10
    return true
  }

  if (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
    // This is internet explorer 9 or 11
    return true
  }

  if (/Edge\/\d./i.test(navigator.userAgent)){
    // This is Microsoft Edge
    return true
  }
}

export default {
  doc: document,
  animating: undefined,
  ballArr: [],
  isIE: isShit(),
  w: window.innerWidth,
  h: window.innerHeight,
  get svgEl() {
    // http://stackoverflow.com/a/4616262
    return this.doc.getElementById('svg-el');
  }
}

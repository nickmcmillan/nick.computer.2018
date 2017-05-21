/* globals window */
import globals from './globals'
import {debounce} from './utilities'

const resize = debounce(function() {
    globals.w = window.innerWidth
    globals.h = window.innerHeight

    // reset ball position just like on init
    globals.ballArr.forEach(function(el) {
        el.x = globals.w / 2 + Math.random()
        el.y = globals.h / 2 + Math.random()
    })
}, 500)

window.addEventListener('resize', resize)

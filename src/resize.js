/* globals window */
import globals from './globals'
import {debounce} from './utilities'

const resize = debounce(() => {
    globals.w = window.innerWidth
    globals.h = window.innerHeight

    // reset ball position just like on init
    globals.ballArr.forEach(ball => {
        ball.x = globals.w / 2 + Math.random()
        ball.y = globals.h / 2 + Math.random()
    })
}, 500)

window.addEventListener('resize', resize)

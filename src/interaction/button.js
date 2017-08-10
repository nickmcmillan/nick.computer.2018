import globals from '../globals'
import options from '../settings/options'
import {addBall} from '../balls'
import {startAnimatingRainbow, stopAnimatingRainbow} from '../rainbow'


const open = () => {
    globals.doc.body.classList.add('open')
    startAnimatingRainbow()
}

const close = () => {
    globals.doc.body.classList.remove('open')
    stopAnimatingRainbow()
}

let x
let button = globals.doc.getElementById('trigger')
button.addEventListener('mousedown', e => x = e.pageX)
button.addEventListener('mouseup',  e => { if (e.pageX === x) open() })
button.addEventListener('touchstart', e => x = e.pageX)
button.addEventListener('touchend', e => {
    if (e.changedTouches[0].pageX === x) open()
})

globals.doc.getElementById('close').addEventListener('click', () => close())
globals.doc.getElementById('close').addEventListener('touchend', () =>  close())

globals.doc.onkeydown = () => {
    addBall(options.BALL_COUNT + 1)
    options.BALL_COUNT++
}

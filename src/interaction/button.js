import globals from '../globals'
import options from '../settings/options'
import {addBall} from '../balls'

let x
let button = globals.doc.getElementById('trigger')
button.addEventListener('mousedown', e => x = e.pageX)
button.addEventListener('mouseup',  e => { if (e.pageX === x) globals.doc.body.classList.add('open') })
button.addEventListener('touchstart', e => x = e.pageX)
button.addEventListener('touchend', e => {
    if (e.changedTouches[0].pageX === x) {
        globals.doc.body.classList.add('open')
    }
})

globals.doc.getElementById('close').addEventListener('click', () => globals.doc.body.classList.remove('open'))
globals.doc.getElementById('close').addEventListener('touchend', () =>  globals.doc.body.classList.remove('open'))

globals.doc.onkeydown = () => {
    addBall(options.BALL_COUNT + 1)
    options.BALL_COUNT++
}

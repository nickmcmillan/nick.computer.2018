// https://codepen.io/hey-nick/pen/kkboWO

import globals from './globals'

const c = document.getElementById('bg')
const $ = c.getContext('2d')
const width = c.width
const height = c.height
let t = 0

const contrast = 64
const brightness = 192
const framerate = 0.15


const col = function(x, y, r, g, b) {
    $.fillStyle = "rgb(" + r + "," + g + "," + b + ")"
    $.fillRect(x, y, 1, 1)
}
const R = function(x, y, t) {
    return( Math.floor(brightness + contrast * Math.cos( (x*x-y*y)/300 + t )) )
}

const G = function(x, y, t) {
    return( Math.floor(brightness + contrast * Math.sin( (x*x*Math.cos(t/4)+y*y*Math.sin(t/3))/300 ) ) )
}

const B = function(x, y, t) {
    return( Math.floor(brightness + contrast * Math.sin( 5*Math.sin(t/9) + ((x-100)*(x-100)+(y-100)*(y-100))/1100) ))
}

const renderLoop = function() {
    for (let x = 0; x <= width; x++) {
        for (let y = 0; y <= height; y++) {
            col(x, y, R(x,y,t), G(x,y,t), B(x,y,t))
        }
    }
    t = t + framerate

    globals.animatingRainbow = window.requestAnimationFrame(renderLoop)
}


export const startAnimatingRainbow = () => {
    if (!globals.animatingRainbow) {
        renderLoop()
    }
}

export const stopAnimatingRainbow = () => {
    if (globals.animatingRainbow) {
        cancelAnimationFrame(globals.animatingRainbow)
        globals.animatingRainbow = undefined
    }
}

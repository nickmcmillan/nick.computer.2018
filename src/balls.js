/* globals window */
import globals from './globals'
import options from './settings/options'
import colors from './settings/colors'
import {random} from './utilities'
import {getPolyPoints} from './polypoints'
import updateInertia from './inertia'

let appendedBalls = []; // store a reference to all balls in here, so we don't need to query the dom

const INNER_WIDTH = globals.w
const INNER_HEIGHT = globals.h
const INNER_WIDTH_HALF = INNER_WIDTH / 2
const INNER_HEIGHT_HALF = INNER_HEIGHT / 2

const panelEl = globals.doc.getElementById('panel')

const addBall = (i, fill, radius, isTitleBall) => {

    let newBall = {
        id: i,
        fill: fill || colors[Math.floor(Math.random() * colors.length)],
        x: INNER_WIDTH_HALF + Math.random(),
        y: INNER_HEIGHT_HALF + Math.random(),
        vx: 0,
        vy: 0,
        positionX: 0,
        positionY: 0,
        velocityX: 0,
        velocityY: 0,
        mousedownX: 0,
        mousedownY: 0,
        dragStartPositionX: 0,
        dragStartPositionY: 0,
        r: radius || random(options.MIN_SIZE, options.MAX_SIZE),
        isDragging: false,
        isTitleBall
    };

    globals.ballArr.push(newBall);

};


const circlePack = function(i, currentBall) {
    // circle packing based on: http://codepen.io/jun-lu/pen/rajrJx
    let c
    let dx
    let dy
    let d
    let l
    let r

    for (let j = 0; j < globals.ballArr.length; j++) {

        if (i === j) {
            continue // skip this loop
        }

        c = globals.ballArr[j]

        dx = c.x - currentBall.x
        dy = c.y - currentBall.y
        d = (dx * dx) + (dy * dy)
        r = c.r + currentBall.r
        l = r * r * options.SPREAD_PUSH

        if (d < l) {

            let f = (options.attachment - d / l) * r
            let t = Math.atan2(dy, dx)

            // set right edge && left edge boundaries
            let hozBoundary = c.x < INNER_WIDTH - c.r && c.x > c.r
            let verBoundary = c.y < INNER_HEIGHT - c.r && c.y > c.r

            // if the ball is over the boundary divide its movement by 10 so it doesn't disappear out of viewport
            c.vx += Math.cos( t ) * f / (hozBoundary ? 1 : 10)
            c.vy += Math.sin( t ) * f / (verBoundary ? 1 : 10)
        }
    }
}

const manageBall = function(i, currentBall) {

    let gEl

    if (!currentBall.added) {
        // CREATE NEW BALL

        currentBall.added = true;

        gEl = globals.doc.createElementNS('http://www.w3.org/2000/svg', 'g')
        let polyEl = globals.doc.createElementNS('http://www.w3.org/2000/svg', 'polygon')

        polyEl.setAttribute('fill', currentBall.fill)
        polyEl.setAttribute('points', getPolyPoints(currentBall.r * options.BALL_ROUGHNESS, currentBall.r))

        gEl.id = i
        gEl.classList.add('ball')
        gEl.appendChild(polyEl)

        if (currentBall.isTitleBall) {
            const titleHTML = globals.doc.getElementById('foreignObject');
            gEl.classList.add('ball--title')
            gEl.appendChild(titleHTML)
        }

        // create a record of appended ball
        appendedBalls.push(gEl)
        // and finally append it into the dom
        globals.svgEl.appendChild(gEl)


    } else {
        // update existing ball
        gEl = appendedBalls[i]
    }

    currentBall.vx *= options.SPREAD_SPEED
    currentBall.vy *= options.SPREAD_SPEED

    let roundedY = Math.round((currentBall.y += currentBall.vy) * 100) / 100
    let roundedX = Math.round((currentBall.x += currentBall.vx) * 100) / 100

    if (!globals.isIE) {
        gEl.style.transform = 'translate3d(' + roundedX + 'px, ' + roundedY + 'px, 0)'
        if (currentBall.isTitleBall && globals.w > 768) {
            panelEl.style.transform = 'translate3d(' + (roundedX - 100) + 'px, ' + (roundedY - 160) + 'px, 0)'
        }
    } else {
        //http://stackoverflow.com/a/28776528
        gEl.setAttribute('transform', 'translate(' + roundedX + ', ' + roundedY + ')')
    }
}


const renderLoop = function() {

    for (let i = 0; i < globals.ballArr.length; i++) {

        let currentBall = globals.ballArr[i];

        circlePack(i, currentBall)
        manageBall(i, currentBall)

    }

    updateInertia()

    globals.animating = window.requestAnimationFrame(renderLoop)

}


function startAnimationLoop() {
    if (!globals.animating) {
        renderLoop();
    }
}


// function stopAnimationLoop() {
//     if (globals.animating) {
//         cancelAnimationFrame(globals.animating);
//         globals.animating = undefined;
//     }
// }
// setTimeout(function() {
//     stopAnimationLoop();
// }, 3000);


// generate the balls!
for (let i = 0; i < options.BALL_COUNT; i++) {
    addBall(i);
}
addBall(options.BALL_COUNT, '#000', 100, true);

globals.doc.getElementById('close').addEventListener('click', ()=>{
    globals.doc.body.classList.remove('open')
})

let x
let button = globals.doc.getElementById('trigger')
button.addEventListener('mousedown', e =>{
    x = e.pageX
})
button.addEventListener('mouseup', e => {
    if (e.pageX === x) {
        // it's a click!
        globals.doc.body.classList.add('open')
    }
})

globals.doc.onkeydown = () => {
    addBall(options.BALL_COUNT + 1)
    options.BALL_COUNT++
}


startAnimationLoop();

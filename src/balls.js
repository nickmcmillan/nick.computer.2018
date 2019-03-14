/* globals window */
import globals from './globals'
import options from './settings/options'
import colors from './settings/colors'
import { random } from './utilities'
import { getPolyPoints } from './polypoints'
import updateInertia from './inertia'

const appendedBalls = []; // store a reference to all balls in here, so we don't need to query the dom

const INNER_WIDTH = globals.w
const INNER_HEIGHT = globals.h

const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');


export const addBall = (i, fill, radius) => {

  const newBall = {
    id: i,
    fill: fill || colors[Math.floor(Math.random() * colors.length)],
    x: INNER_WIDTH / 4 + Math.random(),
    y: INNER_HEIGHT / 4 + Math.random(),
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
  }

  globals.ballArr.push(newBall)

}

// circle packing based on: http://codepen.io/jun-lu/pen/rajrJx
const circlePack = (i, currentBall) => {

  for (let j = 0; j < globals.ballArr.length; j++) {

    if (i === j) {
      continue // skip this loop
    }

    const c = globals.ballArr[j]

    const dx = c.x - currentBall.x
    const dy = c.y - currentBall.y
    const d = (dx * dx) + (dy * dy)
    const r = c.r + currentBall.r
    const l = r * r * options.SPREAD_PUSH

    if (d < l) {

      const f = (1 - d / l) * r
      const t = Math.atan2(dy, dx)

      // set right edge && left edge boundaries
      const hozBoundary = c.x < INNER_WIDTH - c.r && c.x > c.r
      const verBoundary = c.y < INNER_HEIGHT - c.r && c.y > c.r

      // if the ball is over the boundary divide its movement by 10 so it doesn't disappear out of viewport
      c.vx = c.vx + Math.cos( t ) * f / (hozBoundary ? 1 : 10)
      c.vy = c.vy + Math.sin( t ) * f / (verBoundary ? 1 : 10)
    }
  }
}

const manageBall = function(i, currentBall) {

  const gEl = {}

  if (!currentBall.added) {
    // CREATE NEW BALL

    currentBall.added = true

    // gEl = globals.doc.createElementNS('http://www.w3.org/2000/svg', 'g')
    // let polyEl = globals.doc.createElementNS('http://www.w3.org/2000/svg', 'polygon')

    // polyEl.setAttribute('fill', currentBall.fill)
    // polyEl.setAttribute('points', getPolyPoints(currentBall.r * options.ROUGHNESS, currentBall.r))

    gEl.id = i
    // gEl.classList.add('ball')
    // gEl.appendChild(polyEl)

    // create a record of appended ball
    appendedBalls.push(gEl)
    // and finally append it into the dom
    // globals.svgEl.appendChild(gEl)

   


  } else {
    // update existing ball
    gEl = appendedBalls[i]
  }

  currentBall.vx *= options.SPREAD_SPEED
  currentBall.vy *= options.SPREAD_SPEED

  const roundedY = Math.round((currentBall.y += currentBall.vy) * 100) / 100
  const roundedX = Math.round((currentBall.x += currentBall.vx) * 100) / 100

  // console.log(gEl)

  ctx.beginPath();
  ctx.fillStyle = 'pink';
  ctx.beginPath();

  
  ctx.arc(m.x += m.vx, m.y += m.vy, m.r, 0, Math.PI * 2, false);
  ctx.fill();
  

  if (!globals.isIE) {
      // gEl.style.transform = 'translate3d(' + roundedX + 'px, ' + roundedY + 'px, 0)'
      
  } else {
      //http://stackoverflow.com/a/28776528
      // gEl.setAttribute('transform', 'translate(' + roundedX + ', ' + roundedY + ')')

  }
}


const renderLoop = function() {

  ctx.clearRect(0, 0, INNER_WIDTH, INNER_HEIGHT)

  for (let i = 0; i < globals.ballArr.length; i++) {

      const currentBall = globals.ballArr[i];

      // circlePack(i, currentBall)
      manageBall(i, currentBall)

  }

  // updateInertia()

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

startAnimationLoop();

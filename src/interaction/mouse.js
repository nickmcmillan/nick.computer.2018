import {closest} from '../utilities'
import globals from '../globals'
import setDragPosition from '../inertia/setDragPosition'
import store from '../store'

globals.doc.addEventListener('mousedown', e => {
    e.preventDefault()

    closest(e.target, function(el) {

        if (el.tagName === 'g') {

            el.classList.add('held')

            // get the ball id of the one just clicked
            let newID = parseInt(el.id, 10)

            let positionX = globals.ballArr[newID].x
            let positionY = globals.ballArr[newID].y


            globals.ballArr[newID].mousedownX = e.pageX
            globals.ballArr[newID].mousedownY = e.pageY
            globals.ballArr[newID].dragStartPositionX = positionX
            globals.ballArr[newID].dragStartPositionY = positionY
            globals.ballArr[newID].velocityX = 0
            globals.ballArr[newID].velocityY = 0
            globals.ballArr[newID].isDragging = true

            setDragPosition(e, globals.ballArr[newID])

            if (!store.heldBalls.includes(newID)) {
                store.heldBalls.push(newID)
            }

        }

    })

})


globals.doc.addEventListener('mousemove', e => {
    if (store.heldBalls.length) {
        for (var i = 0; i < store.heldBalls.length; i++) {
            setDragPosition(e, globals.ballArr[store.heldBalls[i]])
        }
    }
})


globals.doc.addEventListener('mouseup', e => {

    closest(e.target, el => {
        if (el.tagName === 'g') {
            el.classList.remove('held')
        }
    })

    globals.ballArr.forEach(ball => {
        ball.isDragging = false
    })

})

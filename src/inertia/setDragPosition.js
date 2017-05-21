import globals from '../globals'

export default function setDragPosition( e, currentBall ) {
    //e.preventDefault()

    // dont move the ball around if inertia is carrying it, only when were dragging
    if (!currentBall.isDragging) {
        return
    }

    let moveX = e.pageX - currentBall.mousedownX
    let moveY = e.pageY - currentBall.mousedownY

    currentBall.dragPositionX = currentBall.dragStartPositionX + moveX
    currentBall.dragPositionY = currentBall.dragStartPositionY + moveY

    globals.ballArr[currentBall.id].x = currentBall.dragPositionX
    globals.ballArr[currentBall.id].y = currentBall.dragPositionY

}

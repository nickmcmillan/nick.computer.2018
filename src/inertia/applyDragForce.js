import globals from '../globals';
import applyForceX from './applyForceX'
import applyForceY from './applyForceY'

export default function applyDragForce(i) {

    if ( !globals.ballArr[i].isDragging ) {
        return;
    }

    let dragVelocityX = globals.ballArr[i].x - globals.ballArr[i].positionX;
    let dragVelocityY = globals.ballArr[i].y - globals.ballArr[i].positionY;
    let dragForceX = dragVelocityX - globals.ballArr[i].velocityX;
    let dragForceY = dragVelocityY - globals.ballArr[i].velocityY;

    applyForceX( dragForceX, i )
    applyForceY( dragForceY, i )

}

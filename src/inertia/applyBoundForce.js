import globals from '../globals';
import applyForceX from './applyForceX'
import applyForceY from './applyForceY'
import options from '../settings/options';

function right(i) {

    let position = globals.ballArr[i].positionX;

    if ( position < options.rightBound ) {
        return;
    }

    let velocity = globals.ballArr[i].velocityX
    let distance = options.rightBound - position;
    let	force = distance * 0.1;
    let rest = position + ( velocity + force ) / ( 1 - options.friction );

    // if in bounds, apply force to align at bounds
    if ( rest > options.rightBound ) {
        applyForceX( force, i )
    } else {
        force = distance * 0.1 - velocity
        applyForceX( force, i)
    }
}


function left(i) {

    let position = globals.ballArr[i].positionX

    if ( position > options.leftBound ) {
        return;
    }

    let velocity = globals.ballArr[i].velocityX
    let distance = options.leftBound - position;
    let	force = distance * 0.1;
    let rest =  position + ( velocity + force ) / ( 1 - options.friction );

    if (rest < options.leftBound ) {
        applyForceX( force, i)
    } else {
        force = distance * 0.1 - velocity
        applyForceX( force, i);
    }


}

function top(i) {

    let position = globals.ballArr[i].positionY

    if ( position > options.topBound ) {
        return;
    }

    let velocity = globals.ballArr[i].velocityY
    let distance = options.topBound - position;
    let	force = distance * 0.1;
    let rest =  position + ( velocity + force ) / ( 1 - options.friction );

    if (rest < options.topBound) {
        applyForceY( force, i)
    } else {
        force = distance * 0.1 - velocity
        applyForceY( force, i);
    }

}

function bottom(i) {

    let position = globals.ballArr[i].positionY

    if ( position < options.bottomBound ) {
        return;
    }

    let velocity = globals.ballArr[i].velocityY
    let distance = options.bottomBound - position;
    let	force = distance * 0.1;
    let rest =  position + ( velocity + force ) / ( 1 - options.friction );

    if (rest > options.bottomBound) {
        applyForceY( force, i)
    } else {
        force = distance * 0.1 - velocity
        applyForceY( force, i);
    }

}

export default function applyBoundForce(i) {

    if (globals.ballArr[i].isDragging) {
        return;
    }

    left(i);
    right(i);
    top(i);
    bottom(i);

}

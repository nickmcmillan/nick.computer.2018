import {closest} from '../utilities';
import globals from '../globals';
import setDragPosition from '../inertia/setDragPosition'
import store from '../store';


globals.doc.addEventListener('touchstart', e => {
    e.preventDefault() // need this cos userscalable was removed from ios10

    closest(e.changedTouches[0].target, function(el) {

        if (el.tagName === 'g') {

            let newID = parseInt(el.id, 10);
            let positionX = globals.ballArr[newID].x;
            let positionY = globals.ballArr[newID].y;

            globals.ballArr[newID].mousedownX = e.changedTouches[0].pageX
            globals.ballArr[newID].mousedownY = e.changedTouches[0].pageY
            globals.ballArr[newID].dragStartPositionX = positionX
            globals.ballArr[newID].dragStartPositionY = positionY
            globals.ballArr[newID].velocityX = 0
            globals.ballArr[newID].velocityY = 0
            globals.ballArr[newID].isDragging = true;

            setDragPosition(e.changedTouches[0], globals.ballArr[newID]);

            if (!store.heldBalls.includes(newID)) {
                store.heldBalls.push(newID);
            }

        }

    })

});


globals.doc.addEventListener('touchmove', e => {
    //e.preventDefault();

    if (store.heldBalls.length) {

        // inertia works
        for (let j = 0; j < e.touches.length; j++) {

            closest(e.touches[j].target, function(el) {

                if (el.tagName === 'g') {
                    for (var i = 0; i < store.heldBalls.length; i++) {

                        // only move the ball that your fingers touch target is touching. jebus this took a long time.
                        if (parseInt(el.id, 10) === globals.ballArr[store.heldBalls[i]].id) {
                            setDragPosition(e.touches[j], globals.ballArr[store.heldBalls[i]]);
                        }

                    }

                }
            })
        }

    }

});


globals.doc.addEventListener('touchend', function(e) {

    // get the <g> element of the finger which was removed
    closest(e.changedTouches[0].target, function(el) {

        if (el.tagName === 'g') {

            el.classList.remove('held')

            let newID = parseInt(el.id, 10);

            globals.ballArr[newID].isDragging = false;

        }

    });

});

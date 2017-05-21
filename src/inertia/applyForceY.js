import globals from '../globals';

export default function( forceY, i ) {
	globals.ballArr[i].velocityY += forceY;
}

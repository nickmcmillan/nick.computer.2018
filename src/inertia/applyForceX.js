import globals from '../globals';

export default function( forceX, i ) {
	globals.ballArr[i].velocityX += forceX;
}

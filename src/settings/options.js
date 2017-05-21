import globals from '../globals';

export default {
    BALL_ROUGHNESS: 0.88, // 1:== perfect circle
    SPREAD_PUSH: 0.15, // how hard the balls push against each other. 1:== neutral
    MIN_SIZE: globals.w < 768 ? 80 : 100,
    MAX_SIZE: globals.w < 768 ? 200 : 500,
    attachment: 1,
    SPREAD_SPEED: 0.075, // how fast react to each other
    BALL_COUNT: globals.w < 768 ? 6 : 6,
    friction: 0.95, // for inertia
    topBound: 0,
    leftBound: 0,
    bottomBound: globals.h,
    rightBound: globals.w
}

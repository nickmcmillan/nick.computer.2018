import globals from '../globals';

export default {
    ROUGHNESS: 0.88, // 1:== perfect circle
    SPREAD_PUSH: 0.2, // how hard the balls push against each other. 1:== neutral
    MIN_SIZE: globals.w < 1024 ? 80 : globals.w < 1600 ? 120 : 150, // phone, tablet, big fella
    MAX_SIZE: globals.w < 1024 ? 200 : globals.w < 1600 ? 250 : 400,
    SPREAD_SPEED: 0.015, // how fast react to each other
    BALL_COUNT: globals.w < 1024 ? 6 : globals.w < 1600 ? 6 : 10,
    FRICTION: 0.95, // for inertia
    topBound: 0,
    leftBound: 0,
    bottomBound: globals.h,
    rightBound: globals.w
}

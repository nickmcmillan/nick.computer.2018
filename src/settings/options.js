import globals from '../globals';

export default {
  ROUGHNESS: 0.75, // 1:== perfect circle
  SPREAD_PUSH: 0.15, // how hard the balls push against each other. 1:== neutral
  SPREAD_SPEED: 0.002, // how fast react to each other
  MIN_SIZE: globals.w < 568 ? 40 : globals.w < 1600 ? 80 : 200, // phone, tablet, big fella
  MAX_SIZE: globals.w < 568 ? 200 : globals.w < 1600 ? 200 : 400,
  BALL_COUNT: globals.w < 568 ? 8 : globals.w < 1600 ? 12 : 14,
  FRICTION: 0.95, // for inertia
  topBound: 0,
  leftBound: 0,
  bottomBound: globals.h,
  rightBound: globals.w
}

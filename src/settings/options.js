import globals from '../globals';

export default {
  ROUGHNESS: 0.85, // 1:== perfect circle
  SPREAD_PUSH: 0.7, // how hard the balls push against each other. 1:== neutral
  MIN_SIZE: globals.w < 1024 ? 100 : globals.w < 1600 ? 140 : 240, // phone, tablet, big fella
  MAX_SIZE: globals.w < 1024 ? 200 : globals.w < 1600 ? 250 : 400,
  SPREAD_SPEED: 0.002, // how fast react to each other
  BALL_COUNT: globals.w < 1024 ? 8 : globals.w < 1600 ? 10 : 12,
  FRICTION: 0.95, // for inertia
  topBound: 0,
  leftBound: 0,
  bottomBound: globals.h,
  rightBound: globals.w
}

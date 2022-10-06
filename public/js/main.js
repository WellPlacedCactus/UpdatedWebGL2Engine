
/** Instantiates all things global in the project **/

/** VARIABLES **/

const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl2');
const mat4 = glMatrix.mat4;
const vec3 = glMatrix.vec3;

const keys = [];
const mouse = {};
mouse.x = 0;
mouse.y = 0;
mouse.down = false;

/** FUNCTIONS **/

const randint = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const setui = text => document.querySelector('.ui').innerHTML = text;

/** EVENT HANDLERS **/

addEventListener('load', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);
  demo();
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);
});

addEventListener('keydown', ({keyCode}) => {
  keys[keyCode] = true;
});

addEventListener('keyup', ({keyCode}) => {
  keys[keyCode] = false;
});

addEventListener('mousemove', ({x, y}) => {
  mouse.x = x;
  mouse.y = y;
});

addEventListener('mousedown', () => {
  mouse.down = true;
});

addEventListener('mouseup', () => {
  mouse.down = false;
});
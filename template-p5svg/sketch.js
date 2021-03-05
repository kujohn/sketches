const w = 1000;
const h = 800;
const center = new p5.Vector(w/2, h/2)

const fps = 60;
const filename = `test`;

let domFrames

let capture = 0;
let captureFrame = capture && 0;
let captureBuffer;

function setup() {
  createCanvas(w, h);
  frameRate(fps);

  domFrames = select("#frames")
  select('#save').elt.addEventListener('click', () => capture = frameCount + 1);
}

function draw() {
  // update frame count in dom
  domFrames.elt.innerHTML = frameCount

  // update captureFrame
  captureFrame = capture && frameCount === capture;

  // is capturing
  if (captureFrame) {
    captureBuffer = createGraphics(w, h, SVG);
  }


  // actual drawing;
  drawer();

  // save
  if (captureFrame) {
    captureBuffer.save(filename);
  }
}

/***************************************/
/************ START DRAWING ************/
/***************************************/

function drawer() {
}


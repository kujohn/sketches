const w = 1000;
const h = 800;
const center = new p5.Vector(w/2, h/2)

const fps = 60;
const filename = `test`;

let domFrames
let domSave

let capture = false;
let captureOn = 0;
let captureFrame = capture && 0;
let captureBuffer;

function setup() {
  frameRate(fps);
  pixelDensity(1);
  captureBuffer = createGraphics(w, h, SVG);
  pixelDensity(2);
  createCanvas(w, h);

  domFrames = select("#frames")
  domSave = select('#save')
  domSave.elt.addEventListener('click', () => {
    capture = true;
    captureOn = frameCount + 1
  });
}

function draw() {
  // update captureFrame
  captureFrame = capture && frameCount === captureOn;

  // update frame count in dom
  domFrames.elt.innerHTML = frameCount

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


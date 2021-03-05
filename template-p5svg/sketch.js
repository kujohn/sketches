const w = 1000;
const h = 800;
const center = new p5.Vector(w/2, h/2)

const fps = 60;
const filename = `test`;

let domFrames
let domCapture
let domCaptureFrames

let captureStart = 0;
let captureEnd = 0;
let captureDuration = 1;
let capturing = false;
let captureBuffer = null;

function setup() {
  createCanvas(w, h);
  frameRate(fps);
  domFrames = select("#frames")
  domCapture = select("#capture")
  domCaptureFrames = select("#userFrames")
  domCapture.elt.addEventListener('click', () => {
    captureBuffer = createGraphics(w, h, SVG);
    captureDuration = parseInt(domCaptureFrames.elt.value);
    captureStart = frameCount + 1;
    captureEnd = frameCount + 1 + captureDuration;
  });
}

function draw() {
  // update capturing
  capturing = frameCount >= captureStart && frameCount < captureEnd;

  if (capturing) {
    domCapture.elt.innerHTML = captureEnd - frameCount;
  }

  // update frame count in dom
  domFrames.elt.innerHTML = frameCount

  // actual drawing;
  drawer();

  // save
  if (frameCount === captureEnd) {
    captureBuffer.save(filename);
    captureBuffer = null;
    domCapture.elt.innerHTML = "capture"
  }
}

/***************************************/
/************ START DRAWING ************/
/***************************************/

function drawer() {
}

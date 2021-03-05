const w = 900;
const h = 700;
const center = new p5.Vector(w/2, h/2)

const fps = 60;
const filename = `test`;

let domFrames
let domCapture
let domCaptureFrames

let capturing = false;
let captureStart = 0;
let captureEnd = 0;
let captureBuffer = null;
let captureDuration = 100;

let captureAutoStart = false;
let captureAutoFrom = 0;

function setup() {
  createCanvas(w, h);
  frameRate(fps);
  domFrames = select("#frames")
  domCaptureFrames = select("#duration")
  domCaptureFrames.elt.value = captureDuration
  domCapture = select("#capture")
  domCapture.elt.addEventListener('click', () => {
    captureBuffer = createGraphics(w, h, SVG);
    captureDuration = parseInt(domCaptureFrames.elt.value);
    const autoStartAdd = captureAutoStart ? captureAutoFrom : 0;
    captureStart = autoStartAdd + frameCount + 1;
    captureEnd = autoStartAdd + frameCount + 1 + captureDuration;
  });
  init();
}

function draw() {
  // start capture automatically
  if (captureAutoStart) {
    domCapture.elt.click();
    captureAutoStart = false;
  }

  // update capturing
  capturing = frameCount >= captureStart && frameCount < captureEnd;
  if (capturing) {
    domCapture.elt.innerHTML = captureEnd - frameCount;
  }

  // update frame count in dom
  domFrames.elt.innerHTML = frameCount

  // actual drawing
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

function init() {
}

function drawer() {
}

const w = 600;
const h = 600
const svg = false;
const fps = 120;
const center = new p5.Vector(w/2, h/2)

function doubleClicked() {
  if (svg) {
    save('test.svg')
  }
}

let pause = false;
function mouseClicked() {
  pause = !pause;
  if (pause) {
    noLoop();
  } else {
    loop();
  }
}

function setup() {
  if (svg) {
    pixelDensity(1)
    createCanvas(w, h, SVG);
  } else {
    createCanvas(w, h);
  }
  frameRate(fps);
}

function draw() {
}

const w = 600;
const h = 600

function setup() {
  pixelDensity(1)
  createCanvas(w, h, SVG);
  background(255);
}

function doubleClicked() {
  save("xyz.svg")
}

function draw() {
}

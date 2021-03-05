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
  pixelDensity(1);
  captureBuffer = createGraphics(w, h, SVG);
  pixelDensity(2);
  createCanvas(w, h);
  frameRate(fps);

  domFrames = select("#frames")
  domSave = select('#save')
  domSave.elt.addEventListener('click', () => {
    capture = true;
    captureOn = frameCount + 1
  });
  createBalls();
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

let balls = []
function createBalls() {
  for (let i = 0; i < 200; i++) {
    const x = cos(radians(i*36)) * 100;
    const y = sin(radians(i*36)) * 100;
    const c = createVector(center.x + x, center.y + y);
    const mass = random(-5, 15);
    const ball = new Bouncer(c, mass);
    balls.push(ball)
  }
}
function drawer() {
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i]

    // apply wind force
    const wx = random(-0.3, 0.3)
    const wy = random(-0.3, 0.3)
    ball.applyForce(createVector(wx, wy))

    // apply gravity
    const g = createVector(0, 0.2)
    // ball.applyForce(g)
    ball.update();
    ball.draw()
  }
}
class Bouncer {
  constructor (start, mass = 0) {
    this.mass = mass;
    this.location = start;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(f) {
    const ff = f.copy()
    ff.div(this.mass)
    this.acceleration.add(f)
  }

  update() {
    this.velocity.add(this.acceleration)
    this.location.add(this.velocity)
    this.acceleration.mult(0)
  }

  checkEdges () {
    const loc = this.location
    if (loc.x > w) {
      this.location.x = width;
      this.velocity.x *= -1;
    } else if (loc.x < 0) {
      this.velocity.x *= -1;
      this.location.x = 0;
    }

    if (loc.y > h) {
      this.velocity.y *= -1;
      this.location.y = h;
    } else if (loc.y < 0) {
      this.velocity.y *= -1;
      this.location.y = 0;
    }
  }

  draw() {
    const mass = this.mass
    const loc = this.location
    if (captureFrame) {
      captureBuffer.ellipse(loc.x, loc.y, mass * 8, mass * 8)
    }
    ellipse(loc.x, loc.y, mass * 8, mass * 8)
    this.checkEdges();
  }
}

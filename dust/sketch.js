const w = 600;
const h = 600
const svg = false;
const fps = 120;
const center = new p5.Vector(w/2, h/2)

function setup() {
  if (svg) {
    pixelDensity(1)
    createCanvas(w, h, SVG);
  } else {
    createCanvas(w, h);
  }
  frameRate(fps);
  createBalls();
}

function doubleClicked() {
  if (svg) {
    save("test.svg")
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
    this.update();
    const mass = this.mass
    const loc = this.location
    ellipse(loc.x, loc.y, mass * 8, mass * 8)
    this.checkEdges();
  }
}

let balls = []
function createBalls() {
  for (let i = 0; i < 50; i++) {
    const x = cos(radians(i*36)) * 200;
    const y = sin(radians(i*36)) * 200;
    const c = createVector(center.x + x, center.y + y);
    const mass = random(1, 20);
    const ball = new Bouncer(c, mass);
    balls.push(ball)
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

function draw() {
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i]

    // apply wind force
    const wx = random(0, 0)
    const wy = random(-0.03, 0.06)
    ball.applyForce(createVector(wx, wy))

    // apply gravity
    const g = createVector(0.15, 0.0)
    ball.applyForce(g)
    ball.draw()
  }
}

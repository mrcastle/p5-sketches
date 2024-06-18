let mercury;
let venus;
let earth;
let mars;
let jupiter;
let saturn;
let luna;

let centerX;
let centerY;
let sizeOfSun = 100;

let celestialBodies = [];

function setup() {
  createCanvas(1800, 800);

  centerX = 0;
  centerY = height / 2;
  mercury = new Celestial(30, 36, null, 88, color(41, 37, 36));
  venus = new Celestial(75, 67, null, 225, color(253, 230, 138));
  earth = new Celestial(79, 92, null, 365, color(23, 37, 84));
  mars = new Celestial(42, 141, null, 687, color(124, 45, 18));
  jupiter = new Celestial(868, 438, null, 4332, color(253, 230, 138));
  saturn = new Celestial(748, 890, null, 24125, color(254, 215, 170));
  luna = new Celestial(21, 1, earth, 30, color(254, 215, 170));

  celestialBodies = [mercury, venus, earth, mars, jupiter, saturn, luna];
}

function draw() {
  background(15, 23, 42);

  // noFill();
  // circle(centerX, centerY, (141 + sizeOfSun + 21 + 21) * 2);
  // circle(centerX, centerY, 141);
  // circle(centerX, centerY, 141);
  // circle(centerX, centerY, 141);

  //add the sun
  fill(color(250, 204, 21));
  circle(centerX, centerY, sizeOfSun);

  for (let i = 0; i < celestialBodies.length; i++) {
    let celestialBody = celestialBodies[i];

    celestialBody.display();
    celestialBody.move();
  }
}

class Celestial {
  constructor(diameter, distance, parent, days, color) {
    this.diameter = diameter / 2;

    if (parent) {
      this.distance = distance + parent.diameter;
    } else {
      //account for the diameter of the sun, and also multiply by 2 because scale is off
      this.distance = distance * 2 + sizeOfSun;
    }
    this.parent = parent;
    this.days = days;

    this.degrees = 0;
    this.step = 360 / this.days;

    this.currentX = centerX + this.distance;
    this.currentY = centerX + this.distance;

    this.color = color;
  }

  move() {
    if (this.degrees < 360) {
      this.degrees += this.step;
    } else {
      this.degrees = this.degrees - 360;
    }

    if (this.parent !== null) {
      //orbit around the parent
      this.currentX =
        this.parent.currentX + this.distance * cos(radians(this.degrees));
      this.currentY =
        this.parent.currentY + this.distance * sin(radians(this.degrees));
    } else {
      this.currentX = centerX + this.distance * cos(radians(this.degrees));
      this.currentY = centerY + this.distance * sin(radians(this.degrees));
    }
  }

  display() {
    if (this.color) {
      fill(this.color);
    }
    noStroke();
    circle(this.currentX, this.currentY, this.diameter);
  }
}

let centerX;
let centerY;
let sizeOfSun = 200;

let celestialBodies = [];

function setup() {
  createCanvas(1200, 700);

  centerX = 0;
  centerY = height / 2;
  let mercury = new Celestial(30, 50, null, 88, color(41, 37, 36));
  let venus = new Celestial(50, 140, null, 225, color(230, 230, 230));
  let earth = new Celestial(53, 260, null, 365, color(47, 78, 106));
  let luna = new Celestial(12, 8, earth, 30, color(230, 230, 230));
  let mars = new Celestial(32, 390, null, 687, color(153, 61, 0));
  let jupiter = new Celestial(150, 500, null, 4332, color(176, 127, 53));
  let saturn = new Celestial(125, 700, null, 24125, color(176, 143, 54));
  let uranus = new Celestial(100, 875, null, 30687, color(54, 104, 150));
  let neptune = new Celestial(100, 1050, null, 60190, color(85, 128, 170));

  //const celestialValues = Object.values(celestialBodiesData);
  // for (let i = 0; i < celestialValues.length; i++) {
  //   const {
  //     diameter,
  //     distance,
  //     days,
  //     parent,
  //     color: celestialColor,
  //   } = celestialValues[i];
  //   const { r, g, b } = celestialColor;

  //   celestialBodies.push(
  //     new Celestial(

  //       diameter,
  //       distance,
  //       parent ? celestialBodiesData[parent] : null,
  //       days,
  //       color(r, g, b)
  //     )
  //   );
  // }
  celestialBodies = [
    mercury,
    venus,
    earth,
    mars,
    jupiter,
    saturn,
    luna,
    uranus,
    neptune,
  ];
}

function draw() {
  background(15, 23, 42);

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
    this.diameter = diameter;

    if (parent) {
      this.distance = distance + parent.diameter / 2;

      this.currentX = parent.currentX + this.distance;
      this.currentY = parent.currentY + this.distance;
    } else {
      //account for the radius of the sun
      this.distance = distance + this.diameter / 2 + sizeOfSun / 2;

      this.currentX = centerX + this.distance;
      this.currentY = centerY;
    }
    this.parent = parent;
    this.days = days;

    this.degrees = 0;
    this.step = 360 / (this.days * 10);

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
      //orbit around the center
      this.currentX = centerX + this.distance * cos(radians(this.degrees));
      this.currentY = centerY + this.distance * sin(radians(this.degrees));
    }
  }

  display() {
    //add the orbital path if celestial has no parent object
    if (!this.parent) {
      noFill();
      stroke(251, 205, 7);

      circle(
        centerX,
        centerY,
        dist(centerX, centerY, this.currentX, this.currentY) * 2
      );
    }

    if (this.color) {
      fill(this.color);
    }
    noStroke();
    circle(this.currentX, this.currentY, this.diameter);
  }
}

/**
 * Description placeholder
 *
 * @type {*}
 */
let centerX;
/**
 * Description placeholder
 *
 * @type {*}
 */
let centerY;
/**
 * Description placeholder
 *
 * @type {number}
 */
let sizeOfSun = 200;
/**
 * Description placeholder
 *
 * @type {{}}
 */
let celestialBodies = [];

const celestialBodyData = [
  {
    name: "Sol",
    color: { r: 250, g: 204, b: 21 },
    radius: 200,
    distance: 0,
    days: 0,
    satellites: [
      {
        name: "Mercury",
        color: { r: 51, g: 47, b: 46 },
        radius: 30,
        distance: 50,
        days: 88,
        showOrbitalPath: true,
        satellites: null,
      },
      {
        name: "Venus",
        color: { r: 230, g: 230, b: 230 },
        radius: 50,
        distance: 140,
        days: 200,
        showOrbitalPath: true,
        satellites: null,
      },
      {
        name: "Earth",
        color: { r: 47, g: 78, b: 106 },
        radius: 53,
        distance: 260,
        days: 365,
        showOrbitalPath: true,
        satellites: [
          {
            name: "Luna",
            radius: 12,
            distance: 8,
            days: 30,
            color: { r: 246, g: 241, b: 213 },
            satellites: null,
          },
        ],
      },
      {
        name: "Mars",
        color: { r: 153, g: 61, b: 0 },
        radius: 32,
        distance: 390,
        days: 500,
        showOrbitalPath: true,
        satellites: null,
      },
      {
        name: "Jupiter",
        color: { r: 176, g: 127, b: 53 },
        radius: 150,
        distance: 550,
        days: 1000,
        showOrbitalPath: true,
        satellites: null,
      },
      {
        name: "Saturn",
        color: { r: 176, g: 143, b: 54 },
        radius: 125,
        distance: 750,
        days: 2500,
        showOrbitalPath: true,
        satellites: null,
      },
      {
        name: "Uranus",
        color: { r: 54, g: 104, b: 150 },
        radius: 100,
        distance: 900,
        days: 3500,
        showOrbitalPath: true,
        satellites: null,
      },
      {
        name: "Neptune",
        color: { r: 85, g: 128, b: 170 },
        radius: 100,
        distance: 1050,
        days: 4000,
        showOrbitalPath: true,
        satellites: null,
      },
    ],
  },
];

/** Description placeholder */
function setup() {
  const winWidth = window.innerWidth;
  const winHeight = window.innerHeight;
  createCanvas(windowWidth, windowHeight);
  centerX = width / 2;
  centerY = 0;

  celestialBodies = buildCelestial(color, celestialBodyData, null);

  // Planets from the React data structure
  let mercury = new Celestial(30, 50, null, 88, color(51, 47, 46));
  let venus = new Celestial(50, 140, null, 200, color(230, 230, 230));
  let earth = new Celestial(53, 260, null, 365, color(47, 78, 106));
  let luna = new Celestial(12, 8, earth, 30, color(246, 241, 213));
  let mars = new Celestial(32, 390, null, 500, color(153, 61, 0));
  let jupiter = new Celestial(150, 550, null, 1000, color(176, 127, 53));
  let saturn = new Celestial(125, 750, null, 2500, color(176, 143, 54));
  let uranus = new Celestial(100, 900, null, 3500, color(54, 104, 150));
  let neptune = new Celestial(100, 1050, null, 4000, color(85, 128, 170));

  // celestialBodies = [
  //   mercury,
  //   venus,
  //   earth,
  //   luna,
  //   mars,
  //   jupiter,
  //   saturn,
  //   uranus,
  //   neptune,
  // ];
}

/** Description placeholder */
function draw() {
  clear();
  background(15, 23, 42, 0);

  // Add the sun
  //fill(color(250, 204, 21));
  //noStroke();
  //circle(centerX, centerY, sizeOfSun);

  for (let i = 0; i < celestialBodies.length; i++) {
    let celestialBody = celestialBodies[i];
    celestialBody.display();
    celestialBody.move();
  }
}

function buildCelestial(colorFunc, celestials, parent) {
  return celestials
    .map((celestial) => {
      // name: "Sol",
      // color: { r: 250, g: 204, b: 21 },
      // radius: 200,
      // distance: 0,
      // days: 0,
      console.log("celestial", celestial);
      const { radius, distance, days, color, satellites, name } = celestial;
      const builtCelestial = new Celestial(
        radius,
        distance,
        parent ?? null,
        days,
        colorFunc(color.r, color.g, color.b)
      );
      let builtSatellites = [];
      if (satellites) {
        console.log("satellites", satellites);
        builtSatellites = buildCelestial(colorFunc, satellites, builtCelestial);
      }
      console.log("built", name, builtCelestial, builtSatellites);
      return [builtCelestial, ...builtSatellites];
    })
    .flat();
}
/**
 * Description placeholder
 *
 * @class Celestial
 * @typedef {Celestial}
 */
class Celestial {
  /**
   * Creates an instance of Celestial.
   *
   * @constructor
   * @param {*} diameter
   * @param {*} distance
   * @param {*} parent
   * @param {*} days
   * @param {*} color
   */
  constructor(diameter, distance, parent, days, color) {
    this.diameter = diameter;

    if (parent) {
      // Satellite orbiting a planet
      this.distance = distance + parent.diameter / 2;
      this.currentX = parent.currentX + this.distance;
      this.currentY = parent.currentY + this.distance;
    } else {
      // Planet orbiting the sun - start at the distance from center
      // this.currentX = centerX + distance;
      // this.currentY = centerY;
      // this.distance = distance;
      this.currentX = centerX;
      this.currentY = centerY;

      console.log("this sun", this.currentX, this.currentY);
    }

    this.parent = parent;
    this.days = days;
    this.degrees = 90;
    this.step = 360 / (this.days * 10);
    this.color = color;
  }

  /** Description placeholder */
  move() {
    if (this.degrees < 360) {
      this.degrees += this.step;
    } else {
      this.degrees = this.degrees - 360;
    }

    if (this.parent !== null) {
      // Orbit around the parent (e.g., Luna around Earth)
      this.currentX =
        this.parent.currentX + this.distance * cos(radians(this.degrees));
      this.currentY =
        this.parent.currentY + this.distance * sin(radians(this.degrees));
    } else {
      // Orbit around the sun at center (all planets)
      // this.currentX = centerX + this.distance * cos(radians(this.degrees));
      // this.currentY = centerY + this.distance * sin(radians(this.degrees));
    }
  }

  /** Description placeholder */
  display() {
    // Add the orbital path for all bodies
    if (this.parent !== null) {
      // Satellite orbital path (e.g., Luna around Earth)
      noFill();
      stroke(74, 222, 128, 100);
      circle(
        this.parent.currentX,
        this.parent.currentY,
        dist(
          this.parent.currentX,
          this.parent.currentY,
          this.currentX,
          this.currentY
        ) * 2
      );
    } else {
      // Planet orbital path around the sun
      noFill();
      stroke(74, 222, 128, 100);
      circle(
        centerX,
        centerY,
        dist(centerX, centerY, this.currentX, this.currentY) * 2
      );
    }

    // Display the celestial body
    if (this.color) {
      fill(this.color);
    }
    noStroke();
    circle(this.currentX, this.currentY, this.diameter);
  }
}

var PlantData = function() {
  this.size = 500
  this.step = 7.5
  this.petal = "pointy"
  this.hasStroke = true
  this.scale = 5
  this.strokeColor = '#d6ffdf'
  this.innerColor = [136, 243, 204]
  this.outerColor = [88, 213, 169]
}

var data = new PlantData()
var gui = new dat.GUI()
gui.add(data, 'size', 300, 1000)
gui.add(data, 'step', 5, 40)
gui.add(data, 'petal', ['pointy', 'oval'])
gui.add(data, 'hasStroke')
gui.add(data, 'scale', 1, 10)
gui.addColor(data, 'strokeColor')
gui.addColor(data, 'innerColor')
gui.addColor(data, 'outerColor')

class Plant {
  constructor(x, y, n, nMax, step, petal, hasStroke, c_size, strokeColor, fillColor) {
    this.x = x
    this.y = y
    this.n = n
    this.nMax = nMax
    this.step = step
    this.petal = petal
    this.hasStroke = hasStroke
    this.c_size = c_size
    this.strokeColor = strokeColor
    this.fillColor = fillColor
  }

  display() {
    if(this.n < 0) return
    push()
      translate(this.x, this.y)
      let a = this.n * 137.5
      let r = this.c_size * sqrt(this.n)
      rotate(a)
      this.growPetal(r)
    pop()
    this.n -= this.step
  }

  growPetal(r) {

    push()
      const {outer, inner} = this.fillColor
      fill(
        map(this.n, this.nMax, 0, outer[0], inner[0]),  
        map(this.n, this.nMax, 0, outer[1], inner[1]), 
        map(this.n, this.nMax, 0, outer[2], inner[2])
      )
      
      if(this.hasStroke) {
        stroke(this.strokeColor)

      } else {
        noStroke()
      }

      if(this.petal === "pointy") {
        scale(1, map(this.n, this.nMax, 0, 1, .5))

        // pointy
        beginShape()
          vertex(-0.25 * r, 0)
          bezierVertex(
            -0.5 * r, 0.75 * r, 
            0, 0.75 * r,
            0, r
          )
          bezierVertex(
            0, 0.75 * r,
            0.5 * r, 0.75 * r,
            0.25 * r, 0
          )
        endShape(CLOSE)
      } else {
        scale(1, map(this.n, this.nMax, 0, 2, 1))
        // oval petal
        beginShape()
          vertex( -r / 6, 0)
          bezierVertex(
            -2 / 3 * r, r, 
            2 / 3 * r, r,
            r / 6, 0
          )
        endShape(CLOSE)
      }
    pop()
  }

}

let w = window.innerWidth,
    h = window.innerHeight

let plants = []

let c = {}
c.inner  = data.innerColor
c.outer = data.outerColor
let initialPlant = new Plant(150, 150, data.size, data.size, data.step, data.petal, data.hasStroke, data.scale, data.strokeColor, c)

let colorCombos = [
  { 
    // green - green, new life
    light: [56, 249, 215],
    dark: [67, 233, 123]
  },
  {
    dark: [244, 208, 63],
    light: [22, 160, 133]
  },
  { // green - pinkred, looks good  
    light: [213, 88, 200], 
    dark: [36, 210, 146]
  }
]


function setup() {
  createCanvas(w, h)
  angleMode(DEGREES)

  colorMode(RGB)
  
  background('#ffe8e8')
}

function draw() {
  initialPlant.display()


  plants.forEach(plant => {
    plant.display()
  })
}

function doubleClicked() {
  let c = {}
  c.inner  = data.innerColor
  c.outer = data.outerColor

  let plant = new Plant(mouseX, mouseY, data.size, data.size, data.step, data.petal, data.hasStroke, data.scale, data.strokeColor, c)
  plants.push(plant)
}




let bubbles = []
let osc,env,delay
let notes = [57, 59, 60, 62, 64, 65, 67, 69, 71, 72, 74, 76]

let attackLevel = 1.0
let releaseLevel = 0
let attackTime = 0.001
let decayTime = 0.2
let susPercent = 0.2
let releaseTime = 0.5

const colors = ['#c3fbf4', '#fbc3ca', '#fbf4c3', '#89c4fa', '#c3cafb']

class Bubble {
  constructor(x, y, h, c) {
    this.x = x
    this.y = y
    this.h = h
    this.c = c
  }
  display() {
    stroke(this.c)
    strokeWeight(1.5)
    noFill()
    ellipse(0, 0, this.h)
    line(0, 0, 0, 0 + this.h / 2)
  }
}


function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  background(0)
  for (let x = 100; x < width - 60; x+=40) {
    for (let y = 100; y < height - 60; y+=40) {
      let c = color(random(colors))
      let bubble = new Bubble( x, y, 20, c)
      bubbles.push(bubble)
    }  
  } 
  env = new p5.Envelope()
  env.setADSR(attackTime, decayTime, susPercent, releaseTime)
  env.setRange(attackLevel, releaseLevel)
  
  osc = new p5.TriOsc()
  // Start silent
  osc.start()
  osc.amp(0)
  delay = new p5.Delay()
}


function draw(){
  background(0)
  for (let i = 0; i < bubbles.length; i++) {
    const bubble = bubbles[i]
    const { x, y } = bubble
    const d = dist(x, y, mouseX, mouseY)
    const a = atan2(mouseY - y, mouseX - x)
    push()
      translate(x, y)
      rotate(a - HALF_PI)
      bubble.display()
    pop()
    if (d <= 120) {
      bubble.h = map(d, 120, 0, 20, 40)
    } else {
      bubble.h = 20
    }
  }
}


function mouseDragged() {
  const w = width / notes.length
  let note = notes[Math.floor(mouseX / w)]
  let f = map(mouseY, 0, height, .1, .7)
  let delayTime = map(mouseY, 0, height, .05, .7)
  osc.freq(midiToFreq(note))
  osc.amp(env)
  delay.process(osc, delayTime, f, 1300)
  env.play(osc, 0, 0.2)
}
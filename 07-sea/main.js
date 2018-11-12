let drops = []
let angle = 0
let w = 29
let h = 0
let offset = 0
let ma

const colors = ['#0260B0']

class Drop {
    constructor(width, height, depth, color, x, z, offset) {
        this.w = width
        this.h = height
        this.d = depth
        this.c = color
        this.x = x
        this.z = z
        this.offset = offset
    }

    display() {
        box(this.w, this.h, this.d)
        specularMaterial(this.c)
        // ambientMaterial(this.c)
    }
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight, WEBGL)
    ma = atan(1 / sqrt(2))
    noStroke()   
    ortho()
   

    for (let z = 0; z < 500; z+=w) {
        for (let x = 0; x < 500; x+=w) {
            let c = random(colors)
            let drop = new Drop(w - 6, h, w - 6, c, x, z, offset)
            drops.push(drop)
        }
        offset += 0.02
    }
}
  
  
  
function draw() {
    // background(175)

    background(250)
    ambientLight(255)
    pointLight('#FFFFFF', 100, 100, 100)
    pointLight('#FFFFFF', 100, 100, 0)
    pointLight('#FFFFFF', 200, 0, 100)
    pointLight('#BEE9E8', 200, 200, 150)
    pointLight('#5FA8D3', 300, 100, 250)
    directionalLight('#FFFFFF', 100, 100, 100) 


    rotateX(-QUARTER_PI)
    rotateY(ma)

    for (let i = 0; i < drops.length; i++) {
        const drop = drops[i]
        let a = angle + drop.offset
        drop.h = map(noise(a), 0, 1, 100, 400)

        push()
            translate(drop.x - 250, - drop.h / 2 + 100, drop.z - 250)
            drop.display()
        pop()
    }
    angle += 0.01
}
const iso = new Isomer(document.getElementById("apple"))

const { Shape, Path, Point, Color } = Isomer

const green = new Color(114, 176, 42)
const red = new Color(163, 0, 0)
const brown = new Color(127, 48, 8)

const ground = Shape.Prism(Point.ORIGIN, 5, 5, .6)
const grass = Shape.Prism(new Point(0, 0, .6), 5, 5, .4)
const trunk = Shape.Prism(new Point(3.2, 3.2, 0), .6, .6, 3)
const crown = Shape.Prism(new Point(.5, .5, 4), 4, 4, 4)

const apple = Shape.Prism(new Point(1, -.2, 6), .7, .7, .7)
const appleSpur = Shape.Prism(new Point(1.2, -.1, 6.7), .1, .1, .4)
const appleLeaf = Shape.Prism(new Point(1.23, -.4, 6.85), .13, .3, .13)


let angle = 0
let tV = 0
let flip = false
let rotating = true

// function makeGrid(xSize, ySize, zHeight, gridColor) {
//     for (x = 0; x < xSize + 1; x++) {
//       iso.add(new Path([
//         new Point(x, 0, zHeight),
//         new Point(x, xSize, zHeight),
//         new Point(x, 0, zHeight)
//       ]), gridColor);
//     }
//     for (y = 0; y < ySize + 1; y++) {
//       iso.add(new Path([
//         new Point(0, y, zHeight),
//         new Point(ySize, y, zHeight),
//         new Point(0, y, zHeight)
//       ]), gridColor);
//     }
// }


function draw() {
    // clear the canvas
    iso.canvas.clear();
    // draw our trusty grid
  
    requestAnimationFrame(draw)


    iso.add(ground.rotateZ(Point(2.5, 2.5, 0), angle), brown)
    iso.add(grass.rotateZ(Point(2.5, 2.5, 0), angle), green)
    iso.add(trunk.rotateZ(Point(3.5, 3.5, 0), angle), brown)
    
    iso.add(crown.rotateZ(Point(2.5, 2.5, 0), angle), green)

    iso.add(apple.rotateZ(Point(2.5, 2.5, 0), angle), red)
    iso.add(appleSpur.rotateZ(Point(2.5, 2.5, 0), angle), brown)
    iso.add(appleLeaf.rotateZ(Point(2.5, 2.5, 0), angle), green)

    iso.add(apple.translate(1.7, 0, -tV + 1).rotateZ(Point(2.5, 2.5, 0), angle), red)
    iso.add(appleSpur.translate(1.7, 0, -tV + 1).rotateZ(Point(2.5, 2.5, 0), angle), brown)
    iso.add(appleLeaf.translate(1.7, 0, -tV + 1).rotateZ(Point(2.5, 2.5, 0), angle), green)
    
    // makeGrid(12, 12, 0, new Color(100, 100, 100, 0.6))
    //loop with RAF
    if (rotating && angle < Math.PI / 4 && !flip) {
        angle += 0.005
    } else if (rotating && angle > 0) {
        flip = true
        angle -= 0.005
    } else {
        // flip = false
        rotating = false
    }

    if (!rotating && tV < 5) {
        tV += 0.2
    }
    
}
draw()
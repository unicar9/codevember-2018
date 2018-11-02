
var app = app || {}
let frameCount = 0

// an array of vector 3, vertices
let verticesArray = []

// initialize global geometry and material
let particlesGeometry = new THREE.Geometry()
let particleMaterial = new THREE.PointsMaterial()


/* dataGui controller */
app.controller = {
  particlesNumber: 6100,
  velocity: 0.08,
  expansion: 40
};


app.originPos = {
  x: 0,
  y: 0,
  z: 0
}


app.init = function(){
  console.log('Welcome to my universe')
  
  // create a scene
  app.scene = new THREE.Scene()
  app.width = window.innerWidth
  app.height = window.innerHeight

  // create a camera
  app.camera = new THREE.PerspectiveCamera(
    60, 
    app.width / app.height,
    0.1,  
    1000  
  )
 
  // place
  app.camera.position.x = -39
  app.camera.position.y = -40
  app.camera.position.z = 263

  // tell the camera where to look at - the center of the scene (0,0,0)
  app.camera.lookAt( app.scene.position )


  /* WebGL hardware acceleration or fallback to a software renderer */
  app.renderer = new THREE.WebGLRenderer()


  // set the size
  app.renderer.setSize( app.width, app.height )


  // set the background colour
  app.renderer.setClearColor( 0x0000000 ) //background colour


  // create the axis
  // app.axes = new THREE.AxisHelper(40)
  // app.scene.add( app.axes )


  // create an ambient light
  app.ambient = new THREE.AmbientLight( 0x555555 )
  app.scene.add( app.ambient )


  // seed particles for the loop
  app.particles = app.seedParticles()
  app.scene.add( app.particles )


  // camera control mouse and keyboard using the library orbitControls.js
  app.controls = new THREE.OrbitControls( app.camera, app.renderer.domElement )


  // dat.gui panel top right corner
  app.gui = new dat.GUI()
  app.gui.add( app.controller, 'particlesNumber', 100, 10000 )
  app.gui.add( app.controller, 'velocity', 0.01, 1 )
  app.gui.add( app.controller, 'expansion', 20, 70 )

  // append the rendered canvas onto dom
  document.getElementById("output").appendChild( app.renderer.domElement )

  // draw and animate something
  app.animate()

} // end of app init


// animate function
app.animate = function(){
  
  app.animateParticles( frameCount )

  app.renderer.render( app.scene, app.camera )
  requestAnimationFrame( app.animate )

  frameCount++
}


// seed an app.particles for the loop, but actually not rendering anything
app.seedParticles = function() {
    
  let vertx = new THREE.Vector3(0, 0, 0)
  verticesArray.push(vertx)

  particlesGeometry.vertices = verticesArray

  let particleSystem = new THREE.Points( particlesGeometry, particleMaterial )

  return particleSystem
}


app.animateParticles = function(frameCount) {
  
  frameCount = frameCount / 100
  let scale = 2 / (3 - Math.cos(2 * frameCount)) + 100
  let {x, y, z} = app.originPos
  x = scale * Math.cos(frameCount)
  y = scale * Math.sin(2 * frameCount) / 2 
  z = scale / 2 * Math.sin(frameCount) 

  //dispose the geometry and remove the particle system from the scene
  particlesGeometry.dispose()
  app.scene.remove(app.particles)
  
  for (let index = 0; index < 10; index++) {
    let vertx = new THREE.Vector3()

    // store the vertex's centre point of the trajectory
    vertx.originX = x
    vertx.originY = y
    vertx.originZ = z

    // set vertex's position
    vertx.x = x + THREE.Math.randFloat(-5,5)
    vertx.y = y + THREE.Math.randFloat(-5,5)
    vertx.z = z + THREE.Math.randFloat(-5,5)

    // give vertex a velocity and store
    let randV = app.controller.velocity
    vertx.vx = THREE.Math.randFloat( -randV, randV )
    vertx.vy = THREE.Math.randFloat( -randV, randV )
    vertx.vz = THREE.Math.randFloat( -randV, randV )

    
    // push the new vertex to global verticesArray
    verticesArray.push(vertx)  
  }

  // keep limited vertices umber
  if (verticesArray.length > app.controller.particlesNumber ) {
    verticesArray.splice(0, verticesArray.length - app.controller.particlesNumber)
  }


  // create a new geometry
  particlesGeometry = new THREE.Geometry()

  // loop through global verticesArray and push everything to the new Geometry
  verticesArray.forEach( vertx => {
    particlesGeometry.vertices.push(vertx)

    // calculate the distance between vertex and its centre p on the trajectory 
    let dist = Math.sqrt(
      (vertx.x - vertx.originX) ** 2 +
      (vertx.y - vertx.originY) ** 2 +
      (vertx.z - vertx.originZ) ** 2
    )
    
    // constrain the movement
    if (dist > app.controller.expansion) {
      vertx.vx *= -1
      vertx.vy *= -1
      vertx.vz *= -1

    }

    // move the vertex
    vertx.x += vertx.vx
    vertx.y += vertx.vy
    vertx.z += vertx.vz

  })

  // get a color
  let color = new THREE.Color(`hsl(${frameCount*100%360}, 50%, 80%)`)

  // do the material again
  particleMaterial = new THREE.PointsMaterial({
    color: color
  })

  // create and add the new particlesystem to the scene
  app.particles = new THREE.Points(particlesGeometry, particleMaterial)

  app.scene.add(app.particles)
  app.particles.geometry.verticesNeedUpdate = true

}


/* if you want to resize the canvas on window rezise */
app.onResize = function(){
  app.width = window.innerWidth;
  app.height = window.innerHeight;

  app.camera.aspect = app.width / app.height;
  app.camera.updateProjectionMatrix();

  app.renderer.setSize(app.width, app.height);
}
window.addEventListener( "resize", app.onResize, false );
/* resize */



// run app.init when the window is ready
window.onload = app.init;  
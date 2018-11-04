let sky = document.getElementById('sky'),
  viewport = document.getElementById('viewport'),
  skyXAngle = 0,
  skyYAngle = 0,
  d = 0
  clouds = []

window.addEventListener('mousemove', e => {
  skyYAngle = -( .5 - ( e.clientX / window.innerWidth ) ) * 90
  skyXAngle = ( .5 - ( e.clientY / window.innerHeight ) ) * 90
  updateView()
})

function updateView() {
  sky.style.transform = `translateZ(${d}px) \
  rotateX(${skyXAngle}deg) \
  rotateY(${skyYAngle}deg)`
}

function generate() {
    clouds = []

    while (sky.firstChild) {
        sky.removeChild(sky.firstChild)
    }
  
    new Array(20).fill(1).forEach(_ => clouds.push( createCloud() ))  
}

function randy(min, max) {
   return Math.floor(min + (max - min) * Math.random())
}

function createCloud() {

    const div = document.createElement('div')
    div.className = 'cloud'
    const t = `translateX(${randy(0, 0.9 * window.innerWidth)}px) \
    translateY(${randy(0, 0.9 * window.innerHeight)}px) \
    translateZ(${randy(50,200)}px) \
    scale(${randy(3, 6) * 0.1})`
    div.style.transform = t

    // const animation = `move ${randy(5, 15)} linear infinite;`
    // div.style.animation = animation
    div.animate({ 
        marginLeft: ['0px', `${randy(50, 100)}px`, '0px'] 
    },{ 
        duration: randy(5000, 15000),
        iterations: Infinity
    })
    sky.appendChild( div )
  
    return div
}
  
generate()
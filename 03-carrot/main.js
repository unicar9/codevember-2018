const svgContainer = document.getElementById('container');
const animItem = bodymovin.loadAnimation({
  wrapper: svgContainer,
  animType: 'svg',
  loop: true,
  path: 'carrot.json'
});
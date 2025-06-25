var c = document.getElementById('sky');
var context = c.getContext('2d');

var stars = [];
var angle = 0;
var lastRender = 0;

for (var i = 1000; i--;) {
  stars.push({
    d: 2000 - Math.random() * 800,
    a: Math.random() * Math.PI * 2,
    s: Math.random() * 3
  });
}

function loop(time) {
  update(time);
  draw();
  lastRender = time;  
  requestAnimationFrame(loop);
}

function draw() {
  context.fillStyle = '#010';
  context.fillRect(0, 0, 1280, 768);

  stars.forEach(function(star) {
    var origin = {
      x: 1280 / 2,
      y: 2000
    };

    drawStar(
      origin.x + Math.cos(star.a + angle) * star.d,
      origin.y + Math.sin(star.a + angle) * star.d,
      star.s
    )
  });
  
  drawStar(1280 / 2, 768 / 2, 325);
}

function update(time) {
  var delta = (time - lastRender) / 16.66666667;
  var elapsedTime = time - lastRender;

  angle += delta * 0.0001;
}

requestAnimationFrame(loop);

function drawStar(x, y, size) {
  context.beginPath();
  context.arc(x, y, size * 20, 0, 2 * Math.PI, false);

  var grd = context.createRadialGradient(x, y, size, x, y, size * 20);
  grd.addColorStop(0, "rgba(40, 120, 255, 0.15)");
  grd.addColorStop(1, "transparent");
  context.fillStyle = grd;

  context.globalCompositeOperation = 'lighter';
  context.fill();
  context.globalCompositeOperation = 'source-over';

  context.beginPath();
  context.arc(x, y, size * 5, 0, 2 * Math.PI, false);

  var grd = context.createRadialGradient(x, y, size, x, y, size * 5);
  grd.addColorStop(0, "rgba(40, 120, 255, 0.5)");
  grd.addColorStop(1, "transparent");
  context.fillStyle = grd;

  context.globalCompositeOperation = 'lighter';
  context.fill();
  context.globalCompositeOperation = 'source-over';

  context.beginPath();
  context.arc(x, y, size, 0, 2 * Math.PI, false);
  context.fillStyle = 'white';
  context.fill();
};
import "~/common/scss/main.scss";
import planets from './planets';

const G = 0.00000000000667;
const time = 0.1;

window.onload = function() {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 800;
  document.querySelector('.main-wrapper').appendChild(canvas);
  const context = canvas.getContext('2d');
  contextClear(context, canvas)
  var ctx = canvas.getContext('2d');

  function tik() {
    contextClear(context, canvas)

    planets.forEach((planet) => {

      planet.Fgx = 0;
      planet.Fgy = 0;

      planets.forEach((object) => {
        if(planet.name !== object.name) {

          // Притяжение
          const distance = calcDistance(planet.position.x, planet.position.y, object.position.x, object.position.y);
          const vector = calcVector(planet.position.x, planet.position.y, object.position.x, object.position.y);
          const Fg = ( G * planet.mass * object.mass) / distance * distance;
          planet.Fgx = planet.Fgx + Fg * vector.x;
          planet.Fgy = planet.Fgy + Fg * vector.y;
        }
      })

      planet.agx = planet.Fgx / planet.mass;
      planet.agy = planet.Fgy / planet.mass;
      planet.speed_x += planet.agx;
      planet.speed_y += planet.agy;
      planet.position.x += planet.speed_x;
      planet.position.y += planet.speed_y;
      planet.vektor.x = planet.Fgx / (Math.abs(planet.Fgx) + Math.abs(planet.Fgy));
      planet.vektor.y = planet.Fgy / (Math.abs(planet.Fgx) + Math.abs(planet.Fgy));

      drawPlanet(ctx, planet)
    })
     window.requestAnimationFrame(tik);
  }
  tik()
  // setInterval(
  //   () => { tik() },
  //   100
  // )
}










// HELPERS
function drawPlanet(ctx, planet) {
  ctx.beginPath();
  ctx.arc(planet.position.x,planet.position.y,planet.size,0,Math.PI*2,true);
  ctx.fillStyle='#ff0000';
  ctx.strokeStyle='#ff0000';
  ctx.fill();
  ctx.stroke();
  ctx.moveTo(planet.position.x,planet.position.y);
  ctx.lineTo(planet.position.x + planet.vektor.x * 20, planet.position.y + planet.vektor.y * 20);
  ctx.stroke();

  // console.log(planet.name, {
    // "Сила гравитационная": planet.Fg,
    // "Сила центробежная": planet.Fc,
    // "Вектор Fg x": planet.vektor.x,
    // "Вектор Fg y": planet.vektor.y,
    // "Ускорение g x": planet.agx,
    // "Ускорение g y": planet.agy,
  // })
}

function calcDistance(x1, y1, x2, y2) {
  const a = Math.abs(x1 - x2);
  const b = Math.abs(y1 - y2);
  return Math.sqrt(a * a + b * b);
}

function calcVector(x1, y1, x2, y2) {
  const a = x2 - x1;
  const b = y2 - y1;
  const sum = Math.abs(a) + Math.abs(b);
  return {
    x: a / sum,
    y: b / sum
  }
}

function contextClear(context, canvas) {
  context.fillStyle = '#000'; // устанавливаем цвет заливки в черный
  context.fillRect(0, 0, canvas.width, canvas.height); // собственно заливаем все черным
}
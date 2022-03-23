import "~/common/scss/main.scss";
import planets from './planets';

const G = 0.0000000000667;
const time = 1;

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

      planets.forEach((object) => {
        if(planet.name !== object.name) {
          // console.log('object.name', object.name);

          // Притяжение
          const distance = calcDistance(planet.position.x, planet.position.y, object.position.x, object.position.y);
          const Fp = ( G * planet.mass * object.mass ) / distance * distance;
          // console.log('Fp', Fp);

          // Центростремительная сила
          const Fc = ( planet.mass * (Math.abs(planet.speed.x) + Math.abs(planet.speed.y))^2 ) / distance;
          // console.log('Fc', Fc);

          // Результирующая сила
          const Fsum = Fp - Fc;
          // console.log('Fsum', Fsum);

          // Вектор
          const vector = calcVector(planet.position.x, planet.position.y, object.position.x, object.position.y);
          // planet.vektor.x = (planet.vektor.x + vector.x) / 2;
          // planet.vektor.y = (planet.vektor.y + vector.y) / 2;
          // console.log('planet.vektor', Math.abs(planet.vektor.x) + Math.abs(planet.vektor.y));

          const Fx = Fsum * vector.x;
          const Fy = Fsum * vector.y;
          const ax = Fx / planet.mass;
          const ay = Fy / planet.mass;
          planet.speed.x += ax;
          planet.speed.y += ay;
          planet.position.x += planet.speed.x * time;
          planet.position.y += planet.speed.y * time;
          // console.log('planet.speed', {x: planet.speed.x, y: planet.speed.y});
        }
      })
      drawPlanet(ctx, planet)
    })
    window.requestAnimationFrame(tik);
  }
  tik()
  // setInterval(
  //   () => { tik() },
  //   500
  // )
}

















// HELPERS
function drawPlanet(ctx, planet) {
  ctx.beginPath();
  ctx.arc(planet.position.x,planet.position.y,planet.size,0,Math.PI*2,true);
  ctx.stroke();
  ctx.fillStyle='#ff0000';
  ctx.fill();
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
// import get24HoursTemp from "./src/get24HoursTemp";
import _ from "lodash";

const apiKey = '3abdff9144844fafb79224400232406';
const apiUrl = 'http://api.weatherapi.com/v1/current.json';
const apiUrlAstro = 'http://api.weatherapi.com/v1/astronomy.json';
const api7Days = 'https://api.weatherapi.com/v1/forecast.json';
const searchBox = document.querySelector(' .js_input');

document.getElementById('block4').style.display = 'none';
document.getElementById('block1').style.display = 'none';
document.getElementById('block2').style.display = 'none';
document.getElementById('block3').style.display = 'none';

async function checkWeather(city = 'Saint-Petersburg') {
  const responseCurrent = await fetch(`${apiUrl}?key=${apiKey}&q=${city}`);
  const data = await responseCurrent.json();
  const responseAstro = await fetch(`${apiUrlAstro}?key=${apiKey}&q=${city}`);
  const dataAstro = await responseAstro.json();
  const response7Days = await fetch(`${api7Days}?key=${apiKey}&q=${city}&days=7`);
  const data7days = await response7Days.json();
  const weatherCondition = document.querySelector('.weather_cond_main');
  console.log(data);
  console.log(dataAstro);
  console.log(data7days);
  
  document.querySelector('.current_temp').innerHTML = `${Math.round(data.current.temp_c)}°C`;
  document.querySelector('.pressure_value').innerHTML = `${data.current.pressure_mb}`;
  document.querySelector('.feels_like_value').innerHTML = `${Math.round(data.current.feelslike_c)}°C`;
  document.querySelector('.humidity_value').innerHTML = `${data.current.humidity}%`;
  document.querySelector('.indexUV1').innerHTML = `${data.current.uv}`;
  switch (data.current.uv) {
    case 1 || 2:
      document.querySelector('.value_UV').innerHTML = 'Низкий';
      break;
    case 3 || 4 || 5:
      document.querySelector('.value_UV').innerHTML = 'Средний';
      break;
    case 6 || 7:
      document.querySelector('.value_UV').innerHTML = 'Высокий';
      break;
    case 8 || 9 || 10:
      document.querySelector('.value_UV').innerHTML = 'Высокий';
      break;
    default:
      console.log();
      break;
  }
  document.querySelector('.weather_name').innerHTML = data.current.condition.text;
  weatherCondition.src = data.current.condition.icon;
  let { sunset } = dataAstro.astronomy.astro;
  let { sunrise } = dataAstro.astronomy.astro;
  sunset = sunset.slice(0, sunset.length - 3);
  sunrise = sunrise.slice(0, sunset.length);
  document.querySelector('.rainfall_value').innerHTML = `${data.current.precip_mm}мм`;
  document.querySelector('.sunset_time').innerHTML = sunset;
  document.querySelector('.sunrise_time').innerHTML = ` ${sunrise}`;
}

checkWeather();
// eslint-disable-next-line no-unused-vars
function handle(e) {
  if (e.keyCode === 13) {
    checkWeather(searchBox.value);
  }
}
// eslint-disable-next-line no-unused-vars
document.getElementById('btn10Days').onclick = function () {
  if (document.getElementById('block1').style.display === 'none') {
    document.getElementById('btn10Days').style.background = 'url(\'/img/arrow_up.svg\')';
    document.getElementById('block4').style.display = 'flex';
    document.getElementById('block1').style.display = 'flex';
    document.getElementById('block2').style.display = 'flex';
    document.getElementById('block3').style.display = 'flex';
  } else {
    document.getElementById('btn10Days').style.background = 'url(\'/img/arrow_down.svg\')';
    document.getElementById('block4').style.display = 'none';
    document.getElementById('block1').style.display = 'none';
    document.getElementById('block2').style.display = 'none';
    document.getElementById('block3').style.display = 'none';
  }
};
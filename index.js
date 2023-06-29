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
  const response7Days = await fetch(`${api7Days}?key=${apiKey}&q=${city}&days=8`);
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
  // 7 days
  const forecast = data7days.forecast.forecastday;
  const dayIcon = [];
  const dayData = [];
  const dayMinTemp = [];
  const dayMaxTemp = [];
  const tagImgdays = ['.imgDay1', '.imgDay2', '.imgDay3', '.imgDay4', '.imgDay5', '.imgDay6', '.imgDay7'];
  const tagDay = ['.day2', '.day3', '.day4', '.day5', '.day6', '.day7'];
  const tagMinTemp = ['.min_temp1', '.min_temp2', '.min_temp3', '.min_temp4', '.min_temp5', '.min_temp6', '.min_temp7'];
  const tagMaxTemp = ['.max_temp1', '.max_temp2', '.max_temp3', '.max_temp4', '.max_temp5', '.max_temp6', '.max_temp7'];
  for (let i = 0; i <= 6; i += 1) {
    dayIcon.push(forecast[i].day.condition.icon);
    dayMinTemp.push(Math.round(forecast[i].day.mintemp_c));
    dayMaxTemp.push(Math.round(forecast[i].day.maxtemp_c));
    document.querySelector(`${tagImgdays[i]}`).src = dayIcon[i];
    document.querySelector(`${tagMinTemp[i]}`).innerHTML = dayMinTemp[i];
    document.querySelector(`${tagMaxTemp[i]}`).innerHTML = dayMaxTemp[i];
    const averageTemp = (dayMaxTemp[0] + dayMaxTemp[0]) / 2;
    // eslint-disable-next-line prefer-destructuring

    document.getElementById('1').max = dayMaxTemp[0];
    document.getElementById('1').value = averageTemp;
    // console.log(dayMinTemp[i]);
  }
  // eslint-disable-next-line no-restricted-syntax
  for (let i = 0; i <= 6; i += 1) {
    dayData.push(forecast[i + 1].date.slice(5));
    document.querySelector(`${tagDay[i]}`).innerHTML = dayData[i];
  }

const currentDay = data7days.forecast.forecastday["0"].hour;
const nextDay = data7days.forecast.forecastday["1"].hour;

const firstDayTemp = _.reduce(currentDay, ([], hour) => hour.temp_c);
const secondDayTemp = _.reduce(nextDay, ([], hour) => hour.temp_c);

console.log(firstDayTemp);
console.log(secondDayTemp);
}
checkWeather('Saint-Petersburg');






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
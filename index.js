const apiKey = 'd50fea6da78846e2adb160603231206';
const apiUrl = 'http://api.weatherapi.com/v1/current.json';
const apiUrlAstro = 'http://api.weatherapi.com/v1/astronomy.json';
const searchBox = document.querySelector('.js_input');

async function checkWeather(city = 'Saint-Petersburg') {
  const responseCurrent = await fetch(`${apiUrl}?key=${apiKey}&q=${city}`);
  const data = await responseCurrent.json();
  const responseAstro = await fetch(`${apiUrlAstro}?key=${apiKey}&q=${city}`);
  const dataAstro = await responseAstro.json();
  console.log(data);
  console.log(dataAstro);

  document.querySelector('.current_temp').innerHTML = `${data.current.temp_c}°C`;
  document.querySelector('.pressure_value').innerHTML = `${data.current.pressure_mb}`;
  document.querySelector('.feels_like_value').innerHTML = `${Math.round(data.current.feelslike_c)}°C`;
  document.querySelector('.humidity_value').innerHTML = `${data.current.humidity}%`;
  document.querySelector('.indexUV').innerHTML = `${data.current.uv}`;
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
  }
  document.querySelector('.rainfall_value').innerHTML = `${data.current.precip_mm}мм`;
  document.querySelector('.sunset_time').innerHTML = `${dataAstro.astronomy.astro.sunset}`;
  document.querySelector('.sunrise_time').innerHTML = ` ${dataAstro.astronomy.astro.sunrise}`;
}

// eslint-disable-next-line no-unused-vars
function handle(e) {
  if (e.keyCode === 13) {
    checkWeather(searchBox.value);
  }
}

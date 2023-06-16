const apiKey = 'd50fea6da78846e2adb160603231206';
const apiUrl = 'http://api.weatherapi.com/v1/current.json';
const city = '&q=Saint-Petersburg';

async function checkWeather() {
  const response = await fetch(`${apiUrl}?key=${apiKey}${city}`);
  const data = await response.json();
  console.log(data);

    document.querySelector('.some_class').innerHTML = data.current.feelslike_c + '°C';
}

checkWeather();


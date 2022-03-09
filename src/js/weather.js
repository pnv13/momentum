const WEATHER_ICON = document.querySelector('.weather-icon');
const WEATHER_ERROR = document.querySelector('.weather-error');
const WEATHER_TEMP = document.querySelector('.temperature');
const WEATHER_DESCRIPTION = document.querySelector('.weather-description');
const WEATHER_WIND = document.querySelector('.wind');
const HUMIDITY = document.querySelector('.humidity');
const CITY = document.querySelector('.city');
const LANGUAGE = document.querySelector('.settingsPopup__language');

async function getWeather(lang) {
  if (!lang && CITY.value) {
    lang = localStorage.getItem('language');
  } else {
    lang = LANGUAGE.value;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY.value}&lang=${lang}&appid=4d466002d1f5611fd08f865f84a5f135&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod === '400' || data.cod === '404') {
    WEATHER_ICON.className = 'weather-icon owf';
    WEATHER_TEMP.textContent = '';
    WEATHER_DESCRIPTION.textContent = '';
    WEATHER_WIND.textContent = '';
    HUMIDITY.textContent = '';
    if (lang === 'en') {
      return (WEATHER_ERROR.textContent = `Error! ${data.message} for '${CITY.value}'!`);
    } else if (lang === 'ru') {
      return (WEATHER_ERROR.textContent = `Ошибка! Город не найден для '${CITY.value}'!`);
    }
  }

  WEATHER_ERROR.textContent = '';
  WEATHER_ICON.className = 'weather-icon owf';
  WEATHER_ICON.classList.add(`owf-${data.weather[0].id}`);
  WEATHER_TEMP.textContent = `${Math.round(data.main.temp)}°C`;
  WEATHER_DESCRIPTION.textContent = data.weather[0].description;
  if (lang === 'en') {
    WEATHER_WIND.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    HUMIDITY.textContent = `Humidity: ${data.main.humidity}%`;
  } else if (lang === 'ru') {
    WEATHER_WIND.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`;
    HUMIDITY.textContent = `Влажность: ${data.main.humidity}%`;
  }
}
getWeather();

function setCity(e) {
  if (e.code === 'Enter') {
    getWeather();
    CITY.blur();
  }
}

CITY.addEventListener('change', getWeather);
CITY.addEventListener('keypress', setCity);

export default getWeather;

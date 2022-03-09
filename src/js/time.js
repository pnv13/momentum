import showDate from './date';
import showGreeting from './greeting';
import getWeather from './weather';
import getQuotes from './quotes';

const TIME = document.querySelector('.time');
const LANGUAGE = document.querySelector('.settingsPopup__language');

function currentLanguage() {
  return LANGUAGE.value;
}

function showTime() {
  const mainDate = new Date();
  const currentTime = mainDate.toLocaleTimeString();
  TIME.textContent = currentTime;
  let lang = currentLanguage();
  showDate(lang);
  showGreeting(lang);
  setTimeout(showTime, 1000);
}
showTime();

LANGUAGE.addEventListener('change', () => {
  let lang = currentLanguage();
  getWeather(lang);
  getQuotes(lang);
});

const SETTINGS_BTN = document.querySelector('.settingsBtn');
const SETTINGS_POPUP = document.querySelector('.settingsPopup');
const HIDE_ELEMENTS = document.querySelectorAll('.hideElements > label');
const PLAYER = document.querySelector('.player');
const WEATHER = document.querySelector('.weather');
const QUOTES_BTN = document.querySelector('.change-quote');
const QUOTES_QUOTE = document.querySelector('.quote');
const QUOTES_AUTHOR = document.querySelector('.author');
const MAIN = document.querySelector('.main');

function checkBoxEvent(e) {
  if (e.target.classList.contains('audio-block')) {
    if (e.target.checked) {
      PLAYER.classList.add('hide');
    } else {
      PLAYER.classList.remove('hide');
    }
  }
  if (e.target.classList.contains('weather-block')) {
    if (e.target.checked) {
      WEATHER.classList.add('hide');
    } else {
      WEATHER.classList.remove('hide');
    }
  }
  if (e.target.classList.contains('quotes-block')) {
    if (e.target.checked) {
      QUOTES_BTN.classList.add('hide');
      QUOTES_QUOTE.classList.add('hide');
      QUOTES_AUTHOR.classList.add('hide');
    } else {
      QUOTES_BTN.classList.remove('hide');
      QUOTES_QUOTE.classList.remove('hide');
      QUOTES_AUTHOR.classList.remove('hide');
    }
  }
  if (e.target.classList.contains('time-data-block')) {
    if (e.target.checked) {
      MAIN.classList.add('hide');
    } else {
      MAIN.classList.remove('hide');
    }
  }
}

function toggleSettings() {
  SETTINGS_POPUP.classList.toggle('active');
}

HIDE_ELEMENTS.forEach(elem => elem.addEventListener('click', checkBoxEvent));

SETTINGS_BTN.addEventListener('click', toggleSettings);

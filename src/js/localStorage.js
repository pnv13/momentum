const NAME = document.querySelector('.name');
const CITY = document.querySelector('.city');
const LANGUAGE = document.querySelector('.settingsPopup__language');
const IMAGES_LOADING_TYPE = document.querySelector('.settingsPopup__imagesAPI');

if (localStorage.getItem('city')) {
  CITY.value = localStorage.getItem('city');
} else {
  CITY.value = 'Minsk';
}

function nameAndCityChecker() {
  if (LANGUAGE.value === 'en') {
    if (NAME.value === '') NAME.setAttribute('placeholder', '[Enter name]');
    if (CITY.value === '') CITY.setAttribute('placeholder', '[Enter city]');
  } else {
    if (NAME.value === '') NAME.setAttribute('placeholder', '[Введите имя]');
    if (CITY.value === '') CITY.setAttribute('placeholder', '[Введите город]');
  }
}

function setLocalStorage() {
  localStorage.setItem('name', NAME.value);
  localStorage.setItem('city', CITY.value);
  localStorage.setItem('language', LANGUAGE.value);
  localStorage.setItem('imgSource', IMAGES_LOADING_TYPE.value);
}

function getLocalStorage() {
  if (localStorage.getItem('imgSource')) {
    IMAGES_LOADING_TYPE.value = localStorage.getItem('imgSource');
  }
  if (localStorage.getItem('language')) {
    LANGUAGE.value = localStorage.getItem('language');
  }
  if (localStorage.getItem('name')) {
    NAME.removeAttribute('placeholder');
    NAME.value = localStorage.getItem('name');
  } else if (NAME.value === '' && LANGUAGE.value === 'en') {
    NAME.setAttribute('placeholder', '[Enter name]');
  } else {
    NAME.setAttribute('placeholder', '[Введите имя]');
  }
  if (localStorage.getItem('city')) {
    CITY.removeAttribute('placeholder');
    CITY.value = localStorage.getItem('city');
  } else if (CITY.value === '') {
    CITY.setAttribute('placeholder', '[Enter city]');
  } else {
    CITY.setAttribute('placeholder', '[Введите город]');
  }
}

window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('click', nameAndCityChecker);

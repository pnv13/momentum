const CHANGE_BTN = document.querySelector('.change-quote');
const QUOTE = document.querySelector('.quote');
const QUOTE_AUTHOR = document.querySelector('.author');
const LANGUAGE = document.querySelector('.settingsPopup__language');

async function getQuotes(lang) {
  if (!lang) {
    lang = localStorage.getItem('language');
  } else {
    lang = LANGUAGE.value;
  }
  const quotes = lang === 'en' ? 'dataEN.json' : 'dataRU.json';
  const res = await fetch(quotes);
  const data = await res.json();
  const value = data[Math.floor(Math.random() * data.length)];
  QUOTE.textContent = value.quote;
  QUOTE_AUTHOR.textContent = value.author;
}
getQuotes();

CHANGE_BTN.addEventListener('click', getQuotes);

export default getQuotes;

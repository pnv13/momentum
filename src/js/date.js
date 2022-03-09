const DATE = document.querySelector('.date');

function showDate(lang) {
  const days = {
    en: ['Sunday ', 'Monday ', 'Tuesday ', 'Wednesday ', 'Thursday ', 'Friday ', 'Saturday '],
    ru: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  };
  const mainDate = new Date();
  const options = {
    month: 'long',
    day: 'numeric',
  };
  if (lang === 'en') {
    const currentDate = `${days[lang][mainDate.getDay()]}, ${mainDate.toLocaleDateString(
      'en-US',
      options
    )}`;
    DATE.textContent = currentDate;
  } else {
    const currentDate = `${days[lang][mainDate.getDay()]}, ${mainDate.toLocaleDateString(
      'ru-RU',
      options
    )}`;
    DATE.textContent = currentDate;
  }
}

export default showDate;

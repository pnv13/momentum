const GREETING = document.querySelector('.greeting');

function showGreeting(lang) {
  const mainDate = new Date();
  const hours = mainDate.getHours();
  const greeting = {
    en: ['Good Night', 'Good Morning', 'Good Afternoon', 'Good Evening'],
    ru: ['Доброй Ночи', 'Доброе Утро', 'Добрый День', 'Добрый Вечер'],
  };
  let timeOfDay = greeting[lang][Math.floor(hours / 6)];
  GREETING.textContent = timeOfDay;
}

export default showGreeting;

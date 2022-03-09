const BODY = document.querySelector('body');
const PREV_SLIDE = document.querySelector('.slide-prev');
const NEXT_SLIDE = document.querySelector('.slide-next');
const IMAGES_LOADING_TYPE = document.querySelector('.settingsPopup__imagesAPI');

let randomNum;

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  randomNum = Math.floor(Math.random() * max + min);
}
getRandomNum(1, 20);

async function setBg(source) {
  if (source === undefined && localStorage.getItem('imgSource')) {
    source = localStorage.getItem('imgSource');
  } else if (!localStorage.getItem('imgSource')) {
    source = 'GitHub';
  }
  const mainDate = new Date();
  const img = new Image();
  const hours = mainDate.getHours();
  const arr = ['night', 'morning', 'afternoon', 'evening'];
  const timeOfDay = arr[Math.floor(hours / 6)];
  if (source === 'GitHub') {
    if (randomNum < 10) randomNum = String(randomNum).padStart(2, 0);
    img.src = `https://raw.githubusercontent.com/pnv13/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.webp`;
    img.onload = () => {
      BODY.style.backgroundImage = `url('https://raw.githubusercontent.com/pnv13/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.webp')`;
    };
  } else if (source === 'Unsplash API') {
    const url = `https://source.unsplash.com/1366x625/?nature,${timeOfDay}`;
    const res = await fetch(url);
    img.src = res.url;
    img.onload = () => {
      BODY.style.backgroundImage = `url(${res.url})`;
    };
  } else if (source === 'Flickr API') {
    const flickrGallery = {
      night: '72157720062587146',
      morning: '72157720069530982',
      afternoon: '72157720111881805',
      evening: '72157720111880160',
    };
    const url = `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=8b8e2d84834caf5cb8a37084ef14e84c&gallery_id=${flickrGallery[timeOfDay]}&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    const json = data.photos.photo;
    let server = json[randomNum - 1].server;
    let id = json[randomNum - 1].id;
    let secret = json[randomNum - 1].secret;
    img.src = `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`;
    img.onload = () => {
      BODY.style.backgroundImage = `url(https://live.staticflickr.com/${server}/${id}_${secret}.jpg)`;
    };
  }
}
setBg();

function getSlideNext() {
  if (randomNum < 20) randomNum++;
  else randomNum = 1;
  setBg();
  removeAnimation();
}

function getSlidePrev() {
  if (randomNum > 1) randomNum--;
  else randomNum = 20;
  setBg();
  removeAnimation();
}

function addAnimation() {
  NEXT_SLIDE.addEventListener('click', getSlideNext);
  PREV_SLIDE.addEventListener('click', getSlidePrev);
}
function removeAnimation() {
  NEXT_SLIDE.removeEventListener('click', getSlideNext);
  PREV_SLIDE.removeEventListener('click', getSlidePrev);
  setTimeout(addAnimation, 1500);
}

NEXT_SLIDE.addEventListener('click', getSlideNext);
PREV_SLIDE.addEventListener('click', getSlidePrev);

IMAGES_LOADING_TYPE.addEventListener('change', e => {
  localStorage.setItem('imgSource', e.target.value);
  setBg(e.target.value);
});

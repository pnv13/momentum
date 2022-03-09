import playList from './playList';

const PLAYLIST = document.querySelector('.play-list');
const PLAY = document.querySelector('.play');
const PLAY_PREV = document.querySelector('.play-prev');
const PLAY_NEXT = document.querySelector('.play-next');
const PROGRESSIVE_PLAYER = document.querySelector('.progressive-player');
const CURRENT_TIME = document.querySelector('.progressive-player__current');
const DURATION_TIME = document.querySelector('.progressive-player__length');
const AUDIO_PROGRESS = document.querySelector('.progressive-player__progressBar');
const AUDIO_BTN = document.querySelector('.progressive-player__soundBtn');
const VOLUME_PROGRESS = document.querySelector('.progressive-player__audioProgressBar');
const SONG_TITLE = document.querySelector('.songTitle');

let audio = new Audio();
let isPlay = false;
let activeIndex = 0;
audio.volume = 0.5;

function playPauseAudio() {
  audio.muted = !audio.muted;
  if (audio.muted) {
    AUDIO_BTN.firstElementChild.classList.replace('fa-volume-up', 'fa-volume-mute');
  } else {
    AUDIO_BTN.firstElementChild.classList.replace('fa-volume-mute', 'fa-volume-up');
  }
}

function volumeChanger() {
  audio.volume = +VOLUME_PROGRESS.value;
  const PERCENTAGE = +VOLUME_PROGRESS.value * 100;
  VOLUME_PROGRESS.style.background = `linear-gradient(to right, #FF940A 0%, #FF940A ${PERCENTAGE}%, white ${PERCENTAGE}%, white 100%)`;
}

function changeProgressBar() {
  audio.currentTime = AUDIO_PROGRESS.value;
}

function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds - min * 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
}

function updateProgressValue() {
  AUDIO_PROGRESS.max = audio.duration;
  AUDIO_PROGRESS.value = audio.currentTime;
  CURRENT_TIME.textContent = formatTime(Math.floor(audio.currentTime));
  DURATION_TIME.textContent = formatTime(Math.floor(audio.duration));
  const PERCENTAGE = (AUDIO_PROGRESS.value / AUDIO_PROGRESS.max) * 100;
  AUDIO_PROGRESS.style.background = `linear-gradient(to right, #FF940A 0%, #FF940A ${PERCENTAGE}%, white ${PERCENTAGE}%, white 100%)`;
}

setInterval(updateProgressValue);

function playPause() {
  audio.currentTime = 0;
  audio.src = playList[activeIndex].src;
  SONG_TITLE.textContent = playList[activeIndex].title;
  PLAYLIST.childNodes[activeIndex].classList.add('item-active');
  if (!isPlay) {
    audio.play();
    PLAY.classList.add('pause');
    PROGRESSIVE_PLAYER.classList.add('active');
    isPlay = true;
  } else {
    audio.pause();
    isPlay = false;
    PLAYLIST.childNodes[activeIndex].classList.remove('item-active');
    PLAY.classList.remove('pause');
    PROGRESSIVE_PLAYER.classList.remove('active');
  }
}

function toggleBtn() {
  PLAY.classList.toggle('pause');
  PROGRESSIVE_PLAYER.classList.toggle('active');
}

function nextMusic() {
  PROGRESSIVE_PLAYER.classList.add('active');
  PLAYLIST.childNodes[activeIndex].classList.remove('item-active');
  activeIndex++;
  if (activeIndex > playList.length - 1) activeIndex = 0;
  PLAY.classList.add('pause');
  isPlay = false;
  playPause();
}

function prevMusic() {
  PROGRESSIVE_PLAYER.classList.add('active');
  PLAYLIST.childNodes[activeIndex].classList.remove('item-active');
  activeIndex--;
  if (activeIndex < 0) activeIndex = playList.length - 1;
  PLAY.classList.add('pause');
  isPlay = false;
  playPause();
}

playList.forEach(item => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = item.title;
  PLAYLIST.append(li);
});

const MUSIC_LIST = document.querySelectorAll('.play-item');
MUSIC_LIST.forEach((song, index) => {
  song.addEventListener('click', () => {
    if (index !== activeIndex && isPlay) {
      PLAYLIST.childNodes[activeIndex].classList.remove('item-active');
      activeIndex = index;
      playPause();
    }
    activeIndex = index;
    playPause();
  });
});

VOLUME_PROGRESS.addEventListener('input', volumeChanger);
AUDIO_BTN.addEventListener('click', playPauseAudio);
AUDIO_PROGRESS.addEventListener('input', changeProgressBar);

audio.addEventListener('ended', nextMusic);
PLAY.addEventListener('click', toggleBtn);
PLAY.addEventListener('click', playPause);
PLAY_NEXT.addEventListener('click', nextMusic);
PLAY_PREV.addEventListener('click', prevMusic);

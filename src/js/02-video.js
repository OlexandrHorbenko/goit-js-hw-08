import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const localStorageKey = 'videoplayer-current-time';
const player = new Player('vimeo-player');
const storedTime = localStorage.getItem(localStorageKey);

if (storedTime) {
  player.setCurrentTime(storedTime);
}

function saveCurrentTimeToLocalStorage(data) {
  localStorage.setItem(localStorageKey, JSON.stringify(data.seconds));
}

player.on('timeupdate', throttle(saveCurrentTimeToLocalStorage, 1000));
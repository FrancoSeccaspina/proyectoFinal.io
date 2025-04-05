const music = document.getElementById('background-music');
  music.volume = 0.4;
    document.addEventListener('click', () => {
    if (music.paused) {
      music.play();
    }
  });
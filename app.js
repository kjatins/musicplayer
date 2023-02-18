console.log("Welcome to Lofi");

//initialize the variables
let songIndex = 0;
let music = document.getElementById("audio");
let backimg = document.querySelector(".back");
let progressbar = document.getElementById("progressbar");
let back = document.getElementById("pre");
let playbtn = document.getElementById("play");
let next = document.getElementById("next");
let disk = document.querySelector(".disk");
let songname = document.querySelector(".song-name");
let artistname = document.querySelector(".artist-name");
let currentTime = document.querySelector(".current-time");
let songDuration = document.querySelector(".song-duration");

//songitems;


//play/pause click:
playbtn.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        playbtn.classList.remove('playbtn');
        playbtn.classList.add('pause');
        disk.classList.add('play');
    }
    else {
        music.pause();
        playbtn.classList.remove('pause');
        playbtn.classList.add('playbtn');
        disk.classList.remove('play');
    }
})

back.addEventListener('click', () => {
    if (currentmusic <= 0) {
        songs.length - 1;
    }
    else {
        currentmusic--;
    }
    setsong(currentmusic);
    playbtn.click();
})

next.addEventListener('click', () => {
    if (currentmusic >= songs.length - 1) {
        currentmusic = 0;
    }
    else {
        currentmusic++;
    }
    setsong(currentmusic);
    playbtn.click();
})

//song setup
const setsong = (i) => {
    progressbar.value = 0;
    let song = songs[i];
    currentmusic = i;
    music.src = song.path;
    songname.innerHTML = song.name;
    artistname.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;
    backimg.style.backgroundImage = `url('${song.cover}')`;

    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        progressbar.max = music.duration;
        console.log(music.duration);
        songDuration.innerHTML = formatTime(music.duration);

    }, 100);
}
setsong(0);

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min} :${sec}`;
}

//progress bar running
setInterval(() => {
    progressbar.value = parseInt(music.currentTime);
    currentTime.innerHTML = formatTime(music.currentTime);
    if (Math.floor(music.currentTime) == Math.floor(progressbar.max)) {
        next.click();
    }
}, 500)

progressbar.addEventListener('change', () => {
    music.currentTime = progressbar.value;
})
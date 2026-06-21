const playlistData = [
{
    title: "Track 1",
    artist: "SoundHelix",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
},
{
    title: "Track 2",
    artist: "SoundHelix",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
},
{
    title: "Track 3",
    artist: "SoundHelix",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
}
];

const music = document.getElementById("music");
const songName = document.getElementById("songName");
const artistName = document.getElementById("artistName");

const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const seekBar = document.getElementById("seekBar");
const volumeBar = document.getElementById("volumeBar");

const current = document.getElementById("current");
const total = document.getElementById("total");

const playlist = document.getElementById("playlist");

let index = 0;

function loadTrack(i){
    music.src = playlistData[i].url;

    songName.textContent =
        playlistData[i].title;

    artistName.textContent =
        playlistData[i].artist;
}

function playMusic(){
    music.play();
    playBtn.textContent = "Pause";
}

function pauseMusic(){
    music.pause();
    playBtn.textContent = "Play";
}

playBtn.addEventListener("click", () => {

    if(music.paused){
        playMusic();
    }
    else{
        pauseMusic();
    }
});

nextBtn.addEventListener("click", () => {

    index++;

    if(index >= playlistData.length){
        index = 0;
    }

    loadTrack(index);
    playMusic();
});

prevBtn.addEventListener("click", () => {

    index--;

    if(index < 0){
        index = playlistData.length - 1;
    }

    loadTrack(index);
    playMusic();
});

music.addEventListener("timeupdate", () => {

    seekBar.value =
    (music.currentTime / music.duration) * 100 || 0;

    current.textContent =
    convertTime(music.currentTime);
});

music.addEventListener("loadedmetadata", () => {

    total.textContent =
    convertTime(music.duration);
});

seekBar.addEventListener("input", () => {

    music.currentTime =
    (seekBar.value / 100) * music.duration;
});

volumeBar.addEventListener("input", () => {

    music.volume = volumeBar.value;
});

music.addEventListener("ended", () => {

    index++;

    if(index >= playlistData.length){
        index = 0;
    }

    loadTrack(index);
    playMusic();
});

function convertTime(sec){

    let min = Math.floor(sec / 60);
    let seconds = Math.floor(sec % 60);

    if(seconds < 10){
        seconds = "0" + seconds;
    }

    return `${min}:${seconds}`;
}

playlistData.forEach((song, i) => {

    let item = document.createElement("li");

    item.textContent =
    `${song.title} - ${song.artist}`;

    item.onclick = () => {

        index = i;

        loadTrack(index);

        playMusic();
    };

    playlist.appendChild(item);
});

loadTrack(index);
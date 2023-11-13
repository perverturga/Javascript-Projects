const music = document.querySelector("audio");
const image = document.querySelector("img");
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const title = document.getElementById("title");
const creator = document.getElementById("creator");

const progressDiv = document.getElementById("progressDiv");
const progress = document.getElementById("progress");

const currentTimeSpan = document.getElementById("currentTime");
const totalTimeSpan = document.getElementById("totalTime");


let songIndex = 0;

// music.play();

const songs = [
{
    name: "bootstrap",
    title : "Bootstrap 5 Eğitimi",
    creator: "Can Boz"
},
{
    name: "c",
    title: "C Programlama Eğitimi",
    creator: "Can Boz"
}]

let isPlaying = false;


function loadSong(song){
    // objenin ismine song verildi
    title.textContent =  song.title;
    // title key ine ait value değerini almış oluruz
    creator.textContent = song.creator;
    music.src = `music/${song.name}.mp3`;
    image.src  = `img/${song.name}.png`;
}

// loadSong(songs[1])
// songs arrayinin 0 veya 1 indexi çekebilriz
loadSong(songs[songIndex])

function playSong() {
    isPlaying = true;
    playButton.classList.replace("fa-play", "fa-pause")
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playButton.classList.replace("fa-pause","fa-play")
    music.pause();
}


// bu işlemleri index -1 -2 veya 3 4 5 diye gitmesinin önüne geçmek için yapıldı
// --; ++; dan sonrali konsola ayzılanlar sadece 0 ve 1 oldu
function prevSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex= songs.length -1 ;
        // console.log(songIndex);
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong(){
    songIndex++;
    if(songIndex > songs.length -1) {
        songIndex = 0;
        // console.log(songIndex);
    }
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgressBar(e){
    if(isPlaying) {
        // console.log(e);
        const {currentTime,duration} = e.srcElement;
        // console.log(currentTime);
        // console.log(duration);
        const progressPercent = (currentTime/duration)*100;
        progress.style.width = `${progressPercent}%`

        const durationMinutes =Math.floor((duration/60));
        console.log(durationMinutes);
      
        let durationSeconds = Math.floor(duration % 60);
        console.log(durationSeconds);

        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }
        if(durationSeconds){
            totalTimeSpan.textContent = `${durationMinutes}:${durationSeconds}`
        }   

        const currentMinutes =Math.floor((currentTime/60));
        console.log(currentMinutes);

        let currentSeconds = Math.floor(currentTime % 60);
        console.log(currentSeconds);

        if(currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        if(currentSeconds){
            currentTimeSpan.textContent = `${currentMinutes}:${currentSeconds}`
        }   
    }
}

function setProgressiveBar(e){
    console.log(e);
    const width = e.srcElement.clientWidth;
    console.log(width);

    const {duration} = music;

    const clickX = e.offsetX;
    // console.log((clickX/width)*duration);
    music.currentTime = (clickX/width)*duration
}

playButton.addEventListener("click", ()=>
    isPlaying ? pauseSong() : playSong());
    //! burda isPaying ? konulursa true anlamını taşr, yyularıda false olarka tanımlansa bile


prevButton.addEventListener("click", prevSong);  
nextButton.addEventListener("click", nextSong);  
music.addEventListener("timeupdate", updateProgressBar);
progressDiv.addEventListener("click", setProgressiveBar);
music.addEventListener("ended", nextSong);
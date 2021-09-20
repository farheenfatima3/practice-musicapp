const playButton=document.querySelector(".fa-play")
const audioPlay=document.querySelector(".sound")
const imageRotate=document.querySelector(".image")
const title=document.getElementById("title")
const artist=document.getElementById("artist")
const backward=document.querySelector(".fa-backward")
const forward=document.querySelector(".fa-forward")
const progressTime=document.querySelector(".playing-time")
const durations=document.querySelector(".total")
const divCont=document.querySelector(".prog-out")
const progShow=document.querySelector(".progress")

const data=[
    {
        names:"songOne",
        title:"Unstoppable",
        artist:"Dino James"
    },
    {
        names:"songThree",
        title:"Let's Crack It",
        artist:"Naezy"
    },
    {
        names:"songTwo",
        title:"Khaas",
        artist:"Dino James"
    }
]


let playing=true
function playSong(){
    playing=false
audioPlay.play()
playButton.classList.replace("fa-play","fa-pause")
imageRotate.classList.add("animation")
}

function pause(){
    playing=true
    audioPlay.pause()
    playButton.classList.replace("fa-pause","fa-play")
imageRotate.classList.remove("animation")
}

function goFun(){
    if(playing){
        playSong()
    }else{
        pause()
    }
}
playButton.addEventListener("click",goFun)

function changing(data){
    title.textContent=data.title
    artist.textContent=data.artist;
    audioPlay.src="music/"+data.names+".mp3"
    imageRotate.src="images/"+data.names+".jpg"
}

let index=0
function nextSong(){
index=(index+1)%data.length
changing(data[index])
if(playing){
    pause()
}else{
    playSong()
}


}
function prevSong(){
    index=(index-1+data.length)%data.length
    changing(data[index])
    if(playing){
        pause()
    }else{
        playSong()
    }
}


forward.addEventListener("click",nextSong)
backward.addEventListener("click",prevSong)
playButton.addEventListener("ended",nextSong)
function progress(e){
const {duration,currentTime}=e.target
var min=Math.floor(duration/60)
var sec=Math.floor(duration%60)
if(duration){
    durations.textContent=`${min}:${sec}`
}else{
    durations.textContent=`${0}:${0}${0}`
}


var curMin=Math.floor(currentTime/60)
var curSec=Math.floor(currentTime%60)
if(curSec<10){
    curSec=`0${curSec}`
   
}
progressTime.innerText=`${curMin}:${curSec}`;
const show=currentTime/duration*100;
progShow.style.width=`${show}%`;

}


audioPlay.addEventListener("timeupdate",progress)



function move(e){
    const {duration}=audioPlay
 const offsetX=e.offsetX;
 const clientWidth=e.target.clientWidth
 const clicked=offsetX/clientWidth*duration
console.log(clicked)
console.log(duration)
 audioPlay.currentTime=clicked

}
divCont.addEventListener("click",move)

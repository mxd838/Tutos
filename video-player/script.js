const video = document.querySelector('.video')
const btnPausePlay = document.getElementById('play-pause')
const img = document.querySelector('#play-pause img')
const barreOrange = document.querySelector('.barre-orange')
const muteBtn = document.getElementById('mute')
const fullScreen = document.getElementById('fullscreen')
const volumeSlider = document.getElementById('volume-slider')
const juice = document.querySelector('.juice')

btnPausePlay.addEventListener('click', togglePlayPause)
video.addEventListener('click', togglePlayPause)

function togglePlayPause(){
    if(video.paused){
         img.src = './ressources/pause.svg'
         video.play()
    }
    else {
        img.src = './ressources/play.svg'
        video.pause()
    }
} 

video.addEventListener('timeupdate', () => {

    let juicePos = video.currentTime / video.duration
    juice.style.width = juicePos * 100 + '%'

     if (video.ended){
         img.src = '.ressources/play.svg'
     }
})

volumeSlider.addEventListener('change', () => {
    
    video.volume = volumeSlider.value / 100
})

muteBtn.addEventListener('click', () => {
     
    if (video.muted){
        video.muted = false
        muteBtn.innerText = "Mute"
    }
    else {
        video.muted = true
        muteBtn.innerText = 'Unmute'
    }
})

let rect = barreOrange.getBoundingClientRect()
let largeur = rect.width

barreOrange.addEventListener('click', (e) => {
    
    let x = e.clientX - rect.left
    // console.log(e.clientX)
    // console.log(rect.left)
    // console.log(x)
    let widthPercent = ((x*100/largeur))
    let durationVideo = video.duration

    video.currentTime = durationVideo * (widthPercent / 100)
})

window.addEventListener('resize', () => {
    rect = barreOrange.getBoundingClientRect()
    largeur = rect.width
})

video.addEventListener('dblclick', () => {
    video.requestFullscreen()
})

fullScreen.addEventListener('click', () => {
    video.requestFullscreen()
})
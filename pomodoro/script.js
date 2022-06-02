// Ajouter choix de la duree du pom
// Choix d'enchainer automatiquement les poms et les pauses ou pas
// bouton unique pour play / pause (icone)
// peut-être en surimpression du timer
// ajouter des catégories pour des comptabilisations différenciées des poms
// ajouter localstorage et gestion des dates pour comptabiliser les poms par jours



// DOM Elements
const affichageTravail = document.querySelector('.affichageT')
const affichagePause = document.querySelector('.affichageP')
const btnGo = document.querySelector('.b1')
const btnPause = document.querySelector('.b2')
const btnReset = document.querySelector('.b3')
const cycles = document.querySelector('h2')



// Local Storage
// let currentDayWork = {}

// localStorage.clear()

// if (localStorage.length !== 0){
//     console.log('local storage exits')

// } 

// function createCurrentDayRegister(){
//     let today = new Date()

//     currentDayWork.date = today.getDate()
//     currentDayWork.month = today.getMonth()
//     currentDayWork.year = today.getFullYear()
//     currentDayWork.work = 0
//     currentDayWork.study = 0

//     localStorage.setItem(`${currentDayWork.date}${currentDayWork.month}${currentDayWork.year}`, JSON.stringify(currentDayWork))
// }

// createCurrentDayRegister()

// console.log(localStorage)


// Variables
let checkInterval = false
let tempsInitial = 1500
let tempsDeRepos = 300
let pause = false
let nbDeCycles = 0
cycles.innerText = `Nombre de cycles : ${nbDeCycles}`

affichageTravail.innerText = `${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10)? `0${tempsInitial % 60}`: tempsInitial % 60}`
affichagePause.innerText = `${Math.trunc(tempsDeRepos/60)} : ${(tempsDeRepos % 60 < 10)? `0${tempsDeRepos % 60}`: tempsDeRepos % 60}`

btnGo.addEventListener('click', () => {
    
    if (checkInterval === false){
        
        checkInterval = true
    

        tempsInitial--
        affichageTravail.innerText = `${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10)? `0${tempsInitial % 60}`: tempsInitial % 60}` 

        let timer = setInterval(() => {
            if (pause === false && tempsInitial > 0){
                tempsInitial--
                affichageTravail.innerText = `${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10)? `0${tempsInitial % 60}`: tempsInitial % 60}` 
            }
            else if(pause === false && tempsDeRepos === 0 && tempsInitial === 0){
                tempsInitial = 1500
                tempsDeRepos = 300

                nbDeCycles++
                cycles.innerText = `Nombre de cycles : ${nbDeCycles}`

                localStorage.setItem
                affichageTravail.innerText = `${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10)? `0${tempsInitial % 60}`: tempsInitial % 60}`
                affichagePause.innerText = `${Math.trunc(tempsDeRepos/60)} : ${(tempsDeRepos % 60 < 10)? `0${tempsDeRepos % 60}`: tempsDeRepos % 60}`         
            }
            else if (pause === false && tempsInitial === 0){
                tempsDeRepos--
                affichagePause.innerText = `${Math.trunc(tempsDeRepos/60)} : ${(tempsDeRepos % 60 < 10)? `0${tempsDeRepos % 60}`: tempsDeRepos % 60}` 
            }

        }, 1000)

        btnReset.addEventListener('click', () => {
            clearInterval(timer)
            checkInterval = false
            tempsInitial = 1500
            tempsDeRepos = 300
            affichageTravail.innerText = `${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10)? `0${tempsInitial % 60}`: tempsInitial % 60}`
            affichagePause.innerText = `${Math.trunc(tempsDeRepos/60)} : ${(tempsDeRepos % 60 < 10)? `0${tempsDeRepos % 60}`: tempsDeRepos % 60}`
        })
    }
    else {
        return
    }


})

btnPause.addEventListener('click', () => {
    if (pause === false){
        btnPause.innerText = 'Play'
    }
    else if ( pause === true){
        btnPause.innerText = 'Pause'
    }
    pause = !pause
})




// console.log(currentDayWork)


// create localstorage
// in local storage, register an object
// localStorage.setItem(currentDayWork.date, JSON.stringify(currentDayWork))
// localStorage.clear()
// console.log(localStorage)
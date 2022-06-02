// extension du projet : en faire page d'accueil du navigateur
// en ajoutant, a minima : image de fond changeante, citation et liens vers les sites choisis
// heure de lever et coucher de soleil, previsions pour la journee et la semaine
// bonus : interface translate avec, preselectionnees, les langues qui m'interessent

import tabJoursEnOrdre from "./utilitaires/gestionTemps.js"
import CLEFAPI from '../config.js'


let resultatsAPI

const temps = document.querySelector('.temps')
const temperature = document.querySelector('.temperature')
const localisation = document.querySelector('.localisation')
const heure = document.querySelectorAll('.heure-nom-prevision')
const tempPourH = document.querySelectorAll('.heure-prevision-valeur')
const joursDiv = document.querySelectorAll('.jour-prevision-nom')
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp')
const imgIcone = document.querySelector('.logo-meteo')
const chargementContainer = document.querySelector('.overlay-icone-chargement')

if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
        // console.log(position)
        let long = position.coords.longitude
        let lat = position.coords.latitude
        appelAPI(long, lat)

    }, () => {
        alert("Veuillez activer la géolocalisation pour pouvoir bénéficier de l´application")
    })
}

function appelAPI(long, lat){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
        .then(reponse => {
            return reponse.json()
        })
        .then(data => {
            // console.log(data)
            resultatsAPI = data

            temps.innerText = resultatsAPI.current.weather[0].description
            temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`
            localisation.innerText = resultatsAPI.timezone

            let heureActuelle = new Date().getHours()

            for (let i = 0; i < heure.length; i++) {
                let heureIncr = heureActuelle + i * 3

                if (heureIncr > 24){
                    heure[i].innerText = `${heureIncr - 24} h`
                } else if (heureIncr === 24){
                    heure[i].innerText = '00 h'
                } else {
                    heure[i].innerText = `${heureIncr} h`
                }
            }

            for (let j = 0; j < tempPourH.length; j++){
                tempPourH[j].innerText =`${Math.trunc(resultatsAPI.hourly[j * 3].temp)}°`
            }

            for (let k = 0; k < tabJoursEnOrdre.length; k++){
                joursDiv[k].innerText = tabJoursEnOrdre[k].slice(0,3)
            }

            for (let m = 0; m < 7; m++){
                tempJoursDiv[m].innerText = `${Math.trunc(resultatsAPI.daily[m + 1].temp.day)}°`
            }

            if(heureActuelle >= 6 && heureActuelle <= 21){
                imgIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`
            } else {
                imgIcone.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`
            }

            chargementContainer.classList.add('disparition')
        })
}
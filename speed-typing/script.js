const APICALL = 'http://api.quotable.io/random'

const tempsAffichage = document.querySelector('.temps')
const scoreAffichage = document.querySelector('.score')

const phrase = document.querySelector('.phrase')
const ecriture = document.querySelector('.ecriture')

let temps = 60
let score = 0
let phrasePourScore
tempsAffichage.innerText = `Temps : ${temps}`

 let timer = setInterval(time, 1000)

 function time(){
     temps--
     tempsAffichage.innerText = `Temps : ${temps}`
     scoreAffichage.innerText = `Score : ${score}`
     if (temps === 0){
         clearInterval(timer)
     }
 }


 async function afficherNouvellePhrase(){
     
    const appel = await fetch(APICALL)
    const resultats = await appel.json()
    // console.log(resultats)
    const phraseObtenue = resultats.content
    phrasePourScore = phraseObtenue.length

    phrase.innerHTML = ''
    phraseObtenue.split('').forEach(carac => {
        
        const caracSpan = document.createElement('span')
        caracSpan.innerText = carac
        phrase.appendChild(caracSpan)
    })
    ecriture.value = null
 }

 afficherNouvellePhrase()

 ecriture.addEventListener('input', () => {

    const tableauPhrase = phrase.querySelectorAll('span')
    const tableauTest = ecriture.value.split('')

    let correct = true

    tableauPhrase.forEach((caracSpan, index) => {

        const caractere = tableauTest[index]

        if(caractere === undefined){
            caracSpan.classList.remove('incorrect')
            caracSpan.classList.remove('correct')
            correct = false
        }
        else if (caractere === caracSpan.innerText){
            caracSpan.classList.add('correct')
            caracSpan.classList.remove('incorrect')
        }
        else {
            caracSpan.classList.remove('correct')
            caracSpan.classList.add('incorrect')
            correct = false
        }
    })

    if (correct){
        afficherNouvellePhrase()
        score += phrasePourScore
    }

     
 })
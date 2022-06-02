// à corriger :
// lorsque la date du jour est à moins de sept jours du changement de mois,
// la date affichée change la date du jour mais pas le mois
// et les cookies ne sont pas enregistrés si leur date est antérieure à celle du jour

const affichage = document.querySelector('.affichage')
const btns = document.querySelectorAll('button')
const inputs = document.querySelectorAll('input')
const infoTxt = document.querySelector('.info-text')
let dejaFait = false

const today = new Date()
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

let day = ('0' + nextWeek).slice(9,11)
let month = ('0' + (today.getMonth() + 1)).slice(-2)  
let year = today.getFullYear()
document.querySelector('input[type="date"]').value = `${year}-${month}-${day}`


btns.forEach(btn => {
    btn.addEventListener('click', btnAction)
})

function btnAction(e) {

    let nvObj = {}

    inputs.forEach(input => {
        let attrName = input.getAttribute('name')
        let attrValeur = attrName !== 'cookieExpire' ? input.value : input.valueAsDate
        nvObj[attrName] = attrValeur
    })

    let description = e.target.getAttribute('data-cookie')
    if (description === 'creer'){
        creerCookie(nvObj.cookieName, nvObj.cookieValue, nvObj.cookieExpire)
    }
    else if (description === 'toutAfficher'){
        listeCookies()
    }
}

function creerCookie(name, value, exp){

    infoTxt.innerText = ''
    affichage.innerHTML = '' 

    let cookies = document.cookie.split(';')
    cookies.forEach(cookie => {
        cookie = cookie.trim()
        let formatCookie = cookie.split('=')
        if (formatCookie[0] === encodeURIComponent(name)){
            dejaFait = true
        }
    })

    if (dejaFait) {
        infoTxt.innerText = 'Un cookie possède déjà ce nom.'
        dejaFait = false
        return
    }

    if (name.length === 0){
        infoTxt.innerText = 'Impossible de créer un cookie sans nom.'
        return
    }

    document.cookie = `${encodeURIComponent(name)}=${value};expires=${exp.toUTCString()}`
    let info = document.createElement('li')
    info.innerText = `Cookie ${name} créé.`
    affichage.appendChild(info)
    setTimeout(() => {
        info.remove()
    }, 1500)
}

function listeCookies() {
    let cookies = document.cookie.split(';')
    if (cookies.join() === '') {
        infoTxt.innerText = 'Pas de cookies à afficher.'
        return
    }

    cookies.forEach(cookie => {

        cookie = cookie.trim()
        let formatCookie = cookie.split('=')

        let item = document.createElement('li')
        infoTxt.innerText = 'Cliquez sur un cookie dans la liste pour le supprimer.'
        item.innerText =   `Nom : ${decodeURIComponent(formatCookie[0])}, Valeur : ${decodeURIComponent(formatCookie[1])}`
        affichage.appendChild(item)

        // Suppression cookie
        item.addEventListener('click', () => {
            document.cookie = `${formatCookie[0]}=;expires=${new Date(0)}`
            item.innerText =   `Cookie ${formatCookie[0]} supprimé`
            setTimeout(() => {
                item.remove()
            }, 1000);
        })
    })    
}
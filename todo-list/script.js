const form = document.querySelector('form')
const liste = document.querySelector('ul')
const input = document.querySelector('form input')
let toutesLesTaches = []

// to fix : gets all the records from localstorage, without identifying the current app
// -> need to set item with key corresponding to the app
// -> and the value as an array of object, each of these corresponding to a task
// if(localStorage.length){
//     const keys = Object.keys(localStorage)
//     keys.forEach(item => {
//         const readable = JSON.parse(localStorage.getItem(item))
//         console.log(readable)
//         afficherListe(readable)
//     })
// }

if(!localStorage.length){
    localStorage.setItem('todos',[])
} else {
    JSON.parse(localStorage.getItem('todos')).forEach(todo => {
        afficherListe(todo)
    })
}

form.addEventListener('submit', e => {
    e.preventDefault()
    const text = input.value.trim()
    if(text !== '') {
        rajouterUneTache(text)
        input.value = ''
    }
})

function rajouterUneTache(text) {
    const todo = {
        text,
        id: Date.now()
    }
    // localStorage.setItem(todos, JSON.stringify(todo))
    afficherListe(todo)
}

function afficherListe(todo) {
    const item = document.createElement('li')
    item.setAttribute('data-key', todo.id)

    const input = document.createElement('input')
    input.setAttribute('type','checkbox')
    input.addEventListener('click', tacheFaite)
    item.appendChild(input)

    const txt = document.createElement('span')
    txt.innerText = todo.text
    item.appendChild(txt)

    const btn = document.createElement('button')
    btn.addEventListener('click',supprimerTache)

    const img = document.createElement('img')
    img.setAttribute('src','./ressources/fermer.svg')
    btn.appendChild(img)
    item.appendChild(btn)

    liste.appendChild(item)
    toutesLesTaches.push(item)
}

function tacheFaite(e) {
    e.target.parentNode.classList.toggle('finDeTache')
}

function supprimerTache(e){
    toutesLesTaches.forEach( tache => {

        if (e.target.parentNode.getAttribute('data-key') === tache.getAttribute('data-key')){
            tache.remove()
            toutesLesTaches = toutesLesTaches.filter(li => li.dataset.key !== tache.dataset.key)
            localStorage.removeItem(e.target.parentNode.getAttribute('data-key'))
        }
    })
}
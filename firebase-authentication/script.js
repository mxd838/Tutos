const btnInscription = document.querySelector('.btn-inscription')
const btnConnexion = document.querySelector('.btn-connexion')
const deco = document.querySelector('.btn-deco')
 
const formInscription = document.querySelector('.form-inscription')
const emailInscription = document.querySelector('.email-inscription')
const mdpInscription = document.querySelector('.mdp-inscription')

const formConnexion = document.querySelector('.form-connexion')

console.log(auth)

btnInscription.addEventListener('click', () => {

    if(formConnexion.classList.contains('apparition')){
        formConnexion.classList.remove('apparition')
    }
    
    formInscription.classList.toggle('apparition')
})


btnConnexion.addEventListener('click', () => {

    if(formInscription.classList.contains('apparition')){
        formInscription.classList.remove('apparition')
    }
    
    formConnexion.classList.toggle('apparition')
})


formInscription.addEventListener('submit', (e) => {
    e.preventDefault()

    const mailValeur = emailInscription.value
    const mdpInscriptionValeur = mdpInscription.value

    // createUserWithEmailAndPassword(auth, mailValeur, mdpInscriptionValeur)
    //     .then(cred => {
    //         console.log(cred)
    //     })
})
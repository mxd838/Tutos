// Elements
const boxes = document.querySelectorAll('.box')
const movingDivOne = document.querySelector('#dragMe1')
const movingDivTwo = document.querySelector('#dragMe2')


// Functions
const moveDivOne = (e) => {
    // Gives a name to the moved element for the transfer: item
    // A way to recognize it in the DOM : e.target.id
    e.dataTransfer.setData('item', e.target.id)
}

const moveDivTwo = (e) => {
    e.dataTransfer.setData('item', e.target.id)
}

const dragOver = (e) => {
    // Prevent default div behavior (not accept dragged elements)
    e.preventDefault()
}

const drop = (e) => {
    // Only one div moving at a time so no naming problemns
    const movingDivData = e.dataTransfer.getData('item')
    // Get the div retrieved from the data transfer
    const movedDiv = document.getElementById(movingDivData)
    // Insert the moved div to the parent div over which it is positioned
    e.target.appendChild(movedDiv)
}



// Event listeners
movingDivOne.addEventListener('dragstart', moveDivOne)
movingDivTwo.addEventListener('dragstart', moveDivTwo)
// Loop through the node list to add event listeners to each of them
boxes.forEach(box => {
    box.addEventListener('dragover', dragOver)
    box.addEventListener('drop', drop)
})
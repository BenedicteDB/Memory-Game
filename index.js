const imagesArray =[
    'https://res.cloudinary.com/beumsk/image/upload/v1547980025/memory/Pokemon/Bulbasaur.png',
    'https://res.cloudinary.com/beumsk/image/upload/v1547980083/memory/Pokemon/Charmander.png',
    'https://res.cloudinary.com/beumsk/image/upload/v1547980101/memory/Pokemon/Squirtle.png',
    'https://res.cloudinary.com/beumsk/image/upload/v1547980116/memory/Pokemon/Pikachu.png',
    'https://res.cloudinary.com/beumsk/image/upload/v1547980129/memory/Pokemon/Mewtwo.png',
    'https://res.cloudinary.com/beumsk/image/upload/v1547980142/memory/Pokemon/Mew.png',
    'https://res.cloudinary.com/beumsk/image/upload/v1547980154/memory/Pokemon/Articuno.png',
    'https://res.cloudinary.com/beumsk/image/upload/v1547980164/memory/Pokemon/Zapdos.png',
    'https://res.cloudinary.com/beumsk/image/upload/v1547980025/memory/Pokemon/Bulbasaur.png',
    'https://res.cloudinary.com/beumsk/image/upload/v1547980083/memory/Pokemon/Charmander.png',
    'https://res.cloudinary.com/beumsk/image/upload/v1547980101/memory/Pokemon/Squirtle.png',
    'https://res.cloudinary.com/beumsk/image/upload/v1547980116/memory/Pokemon/Pikachu.png',
    'https://res.cloudinary.com/beumsk/image/upload/v1547980129/memory/Pokemon/Mewtwo.png',
    'https://res.cloudinary.com/beumsk/image/upload/v1547980142/memory/Pokemon/Mew.png',
    'https://res.cloudinary.com/beumsk/image/upload/v1547980154/memory/Pokemon/Articuno.png',
    'https://res.cloudinary.com/beumsk/image/upload/v1547980164/memory/Pokemon/Zapdos.png',
]

const memoryBoard = document.querySelector('#memory-board')
const gameOverScreen = document.querySelector('.gameOverScreen')
let moves = document.querySelector('.moves')

let count = 0
let cardsChosen = []
let cardsMatched = []

const createCard = () => {
    let tempArray = [...imagesArray]

    memoryBoard.innerHTML = ''
    moves.innerHTML = 'Moves:0'

    for(let i = 0; i < 16; i++) {
        const getRandomNumber = Math.floor(Math.random()*tempArray.length)
        const getImageUrl = tempArray.splice(getRandomNumber, 1)
        
        memoryBoard.innerHTML += `
            <div class="card" onclick="flipCard(this)">
                <img class="image"src="${getImageUrl}">
            </div>
        `
    }
}

const flipCard = (e) => {
    e.childNodes[1].classList.add("showCard")
    e.classList.add("noMouseEvent")
    
    cardsChosen.push(e.childNodes[1])
    
    count++
    
    moves.innerHTML = `Moves:${count}`
    
    if(cardsChosen.length === 2){
        checkForMatch() 
    }
}

const checkForMatch = () => {
    const cardOne = cardsChosen[0].currentSrc
    const cardTwo = cardsChosen[1].currentSrc

    if(cardOne === cardTwo){
        cardsChosen[0].classList.add('correctMatch')
        cardsChosen[1].classList.add('correctMatch')
        
        cardsMatched.push(cardOne, cardTwo)
        
        cardsChosen = []

        checkIfGameOver()
    }else{
        setTimeout(() => unFlipCards(), 300)
    }
}

const checkIfGameOver = () => {
    const totalMoves = document.querySelector('.totalMoves')

    if(cardsMatched.length === 16){
        gameOverScreen.style.display = 'flex'
        totalMoves.innerHTML = `with a total of ${count} moves`
    }
}

const unFlipCards = () => {
    cardsChosen[0].classList.remove('showCard')
    cardsChosen[1].classList.remove('showCard')

    removeMouseEvents()
    
    cardsChosen = []
}

const removeMouseEvents = () => {
    cardsChosen[0].parentNode.classList.toggle('noMouseEvent')
    cardsChosen[1].parentNode.classList.toggle('noMouseEvent')
}

const resetGame = () => {
    cardsMatched = []
    count = 0;
    gameOverScreen.style.display = 'none'
    createCard()
}

createCard()
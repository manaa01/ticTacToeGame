const X_CLASS = 'x'
const C_CLASS = 'c'
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll ('[data-cell]')
const board = document.getElementById ('board')
const winningMessageElement = document.getElementById ('winningMessage')
const restartButton = document.getElementById ('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove (X_CLASS)
        cell.classList.remove (C_CLASS)
        cell.removeEventListener('click', handlesClick)
        cell.addEventListener('click', handlesClick, {once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove ('show')
}

function handlesClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? C_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw) {
        endGame(true) 
    } else { 
        swapTurn()
        setBoardHoverClass()
    }
    }



function endGame(Draw) {
    if (Draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "0's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
    }

function isDraw() {
    return cellElements.every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(C_CLASS)
    })
}


function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurn() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(C_CLASS)
    if (circleTurn) {
        board.classList.add (C_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }

    }

    function checkWin(currentClass) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(currentClass)
            })
        })
    }
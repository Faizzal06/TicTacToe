const cells = document.querySelectorAll('.cell');
const pop = document.getElementById('pop')
const popText = document.getElementById('popText')
const statusText = document.getElementById('statusText');
const modeSelect = document.getElementById('modeSelect');

const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"; // Pemain manusia
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    statusText.innerText = `${currentPlayer}'s Turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if (options[cellIndex] != "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.innerText = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.innerText = `${currentPlayer}'s Turn`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winCondition.length; i++) {
        const condition = winCondition[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            for(j=0;j<3;j++){
                cells[winCondition[i][j]].style.backgroundColor = '#08d9d6'
                }
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.innerText = `${currentPlayer} Wins!!!`;
        popText.innerText = `${currentPlayer} Wins!!`
        pop.showPopover()
        running = false;
    } else if (!options.includes("")) {
        statusText.innerText = `No One Wins!`;
        popText.innerText = 'No One Wins!!'
        pop.showPopover()
        running = false;
    } else {
        changePlayer();
        if (currentPlayer === "O" && modeSelect.value === "pve") {
            setTimeout(() => {
                botMove();
            }, 750);
            
        }
    }
}

function botMove() {
    const emptyCells = options.map((option, index) => option === "" ? index : null).filter(index => index !== null);
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const cellIndex = emptyCells[randomIndex];
        const cell = cells[cellIndex];

        updateCell(cell, cellIndex);
        checkWinner();
    }
}

function restartGame(){
    currentPlayer = "X"
    options = ["", "", "", "", "", "", "", "", ""]
    statusText.innerText = `${currentPlayer}'s Turn`
    cells.forEach(cell => cell.innerText = "")
    running = true
    cells.forEach((cell)=>{
        cell.style.backgroundColor = ""
    })
}
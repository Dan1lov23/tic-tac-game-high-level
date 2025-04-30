const cellElements = document.querySelectorAll('.cell');
const messageElement = document.querySelector('.message');
let field = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true; // Игра активна с самого начала
let currentPlayer = "X"; // Начинаем с игрока X

cellElements.forEach((cell, index) => cell.addEventListener('click', (event) => {
    makeMove(event.target, index);
}));

function makeMove(cell, index) {
    if (!isGameActive || field[index] !== "") {
        return;
    }

    cell.classList.add(currentPlayer);
    field[index] = currentPlayer;

    if (checkWinner(currentPlayer)) {
        messageElement.textContent = `Игрок ${currentPlayer} выиграл!`;
        isGameActive = false;
        async function newGame() {
            setTimeout(() => {
                location.reload(true);
            }, [2000])
        }
        newGame();
        return;
    }

    if (isBoardFull()) {
        messageElement.textContent = "Ничья!";
        isGameActive = false;
        async function newGame() {
            setTimeout(() => {
                location.reload(true);
            }, [2000])
        }
        newGame();
        return;
    }

    // Переключаем игрока
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateMessage();
}

function updateMessage() {
    messageElement.textContent = `Ход игрока ${currentPlayer}`;
}

function checkWinner(currentSymbol) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => {
            return field[index] === currentSymbol;
        });
    });
}

function isBoardFull() {
    return field.every(cell => cell !== "");
}


// Инициализация сообщения о ходе
updateMessage();
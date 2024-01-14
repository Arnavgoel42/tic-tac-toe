document.addEventListener('DOMContentLoaded', function () {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetBtn = document.getElementById('resetBtn');
    const resultScreen = document.getElementById('resultScreen');
    const resultText = document.getElementById('resultText');
    const playAgainBtn = document.getElementById('playAgainBtn');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    function checkWinner() {
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

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return null;
    }

    function checkTie() {
        return !gameBoard.includes('');
    }

    function handleClick(index) {
        if (!gameBoard[index] && gameActive) {
            gameBoard[index] = currentPlayer;
            cells[index].textContent = currentPlayer;

            const winner = checkWinner();

            if (winner) {
                showResult(`${winner} wins!`);
                gameActive = false;
            } else if (checkTie()) {
                showResult("It's a tie!");
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                message.textContent = `${currentPlayer}'s turn`;
            }
        }
    }

    function showResult(result) {
        resultText.textContent = result;
        resultScreen.style.display = 'flex';
    }

    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        message.textContent = `${currentPlayer}'s turn`;

        cells.forEach((cell) => {
            cell.textContent = '';
        });

        resultScreen.style.display = 'none';
    }

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleClick(index));
    });

    resetBtn.addEventListener('click', resetGame);

    playAgainBtn.addEventListener('click', () => {
        resetGame();
        resultScreen.style.display = 'none';
    });
});

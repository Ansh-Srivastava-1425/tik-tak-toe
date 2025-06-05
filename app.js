let boxes = document.querySelectorAll(".box");  
let resetBtn = document.querySelector("#reset-button");
let newGamebtn = document.querySelector("#new-game");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#message");

let turnO = true; // true = O's turn, false = X's turn

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const newGame = () => {
    turnO = true;
    enableBoxes();
    msgcontainer.classList.add("hide");
    msg.innerText = ""; // clear message
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
};

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return true; // winner found
        }
    }
    return false; // no winner yet
};

// Add click event listeners to boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return; // already clicked

        box.innerText = turnO ? "O" : "X";
        box.disabled = true;

        if (!checkWinner()) {
            turnO = !turnO; // switch turn only if no winner
        }
    });
});

// Event listeners for new game and reset buttons
newGamebtn.addEventListener("click", newGame);
resetBtn.addEventListener("click", newGame);

// Initialize the game on page load
newGame();

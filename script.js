// Elements
const elements = {
  btnRef: document.querySelectorAll(".button-option"),
  popupRef: document.querySelector(".popup"),
  newgameBtn: document.getElementById("new-game"),
  restartBtn: document.getElementById("restart"),
  msgRef: document.getElementById("message"),
  playerForm: document.getElementById("player-form"),
  gameSetupForm: document.getElementById("game-setup"),
  wrapper: document.getElementById("wrapper"),
  player1: document.getElementById("p1"),
  player2: document.getElementById("p2"),
  score1: document.getElementById("score1"),
  score2: document.getElementById("score2"),
};

// Game state
let player1Name, player2Name, maxScore;
let xTurn = true;
let count = 0;
let player1Score = 0;
let player2Score = 0;

// Winning Pattern Array
const winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

// Update player scores and display
const updateScores = () => {
  elements.player1.textContent = player1Name;
  elements.player2.textContent = player2Name;
  elements.score1.textContent = `score: ${player1Score}`;
  elements.score2.textContent = `score: ${player2Score}`;
};

// Disable All Buttons
const disableButtons = () => {
  elements.btnRef.forEach((element) => (element.disabled = true));
  elements.popupRef.classList.remove("hide");
};

// Enable all buttons (for New Game  and Restart)
const enableButtons = () => {
  elements.btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  elements.popupRef.classList.add("hide");
};

// New Game
elements.newgameBtn.addEventListener("click", () => {
  if (player1Score >= maxScore || player2Score >= maxScore) {
    player1Score = 0;
    player2Score = 0;
    updateScores();
  }
  enableButtons();
  elements.newgameBtn.innerText = "Restart";
  elements.msgRef.innerHTML = "";
});

// This Function is executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    ++player1Score;
    updateScores();
    if (player1Score >= maxScore) {
      elements.msgRef.innerHTML = `&#x1F389; <br>${player1Name} Wins the Game!`;
      elements.newgameBtn.innerText = "Restart";
    } else {
      elements.msgRef.innerHTML = `&#x1F389; <br>${player1Name} Wins`;
      elements.newgameBtn.innerText = "Continue";
    }
  } else {
    ++player2Score;
    updateScores();
    if (player2Score >= maxScore) {
      elements.msgRef.innerHTML = `&#x1F389; <br>${player2Name} Wins the Game!`;
      elements.newgameBtn.innerText = "Restart";
    } else {
      elements.msgRef.innerHTML = `&#x1F389; <br>${player2Name} Wins`;
      elements.newgameBtn.innerText = "Continue";
    }
  }
};

// Function for draw
const drawFunction = () => {
  disableButtons();
  elements.msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
  elements.newgameBtn.innerText = "Continue";
};

// Win Logic
const winChecker = () => {
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      elements.btnRef[i[0]].innerText,
      elements.btnRef[i[1]].innerText,
      elements.btnRef[i[2]].innerText,
    ];

    if (element1 != "" && element2 != "" && element3 != "") {
      if (element1 == element2 && element2 == element3) {
        winFunction(element1);
        count = 0;
      }
    }
  }
};

// Display
elements.btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      element.innerText = "X";
      element.style.color = "#09c372";
      element.disabled = true;
    } else {
      xTurn = true;
      element.innerText = "O";
      element.style.color = "#498afb";
      element.disabled = true;
    }
    count += 1;
    if (count === 9) {
      drawFunction();
    }
    winChecker();
  });
});

// Restart Button
elements.restartBtn.addEventListener("click", () => {
  elements.msgRef.innerHTML = "";
  elements.playerForm.classList.remove("hide");
  elements.wrapper.style.display = "none";
  count = 0;
  player1Score = 0;
  player2Score = 0;
  updateScores();
});

// Event listener for game setup form submission
elements.gameSetupForm.addEventListener("submit", function (event) {
  event.preventDefault();
  player1Name = document.getElementById("player1").value;
  player2Name = document.getElementById("player2").value;
  maxScore = parseInt(document.getElementById("max-score").value);
  elements.playerForm.classList.add("hide");
  elements.wrapper.style.display = "block";
  updateScores();
});

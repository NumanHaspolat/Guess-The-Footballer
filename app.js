import players from "./players.js";

const playerTeam = document.querySelector(".random-player-team");
const playerPos = document.querySelector(".random-player-pos");
const input = document.querySelector("input");
const player = document.querySelector(".player");
const button = document.querySelector("button");
const resStatu = document.querySelector(".res-statu");
const livesRem = document.querySelector(".lives-remain");
const retry = document.querySelector(".retry");
const randomPlayer = Math.round(Math.random() * 66);

let inputValue = "";

const currentPlayer = players.find((p) => p.identifier === randomPlayer);

if (currentPlayer) {
  playerTeam.innerHTML = `${currentPlayer.team}`;
  playerPos.innerHTML = `${currentPlayer.position}`;
  player.innerHTML = `${currentPlayer.first_name} ${currentPlayer.last_name}`;
}

button.addEventListener("click", () => {
  const playerNameParts =
    `${currentPlayer.first_name.toLowerCase()} ${currentPlayer.last_name.toLowerCase()}`.split(
      " "
    );
  const guessedNameParts = inputValue.trim().toLowerCase().split(" ");

  if (guessedNameParts.some((part) => playerNameParts.includes(part))) {
    resStatu.parentElement.classList.add("flex");
    resStatu.innerHTML = `Your guess is correct. Congratulations!`;
    retry.classList.add("green");
    player.classList.add("flex");
  } else if (livesRem.innerText === "1") {
    resStatu.parentElement.classList.add("flex");
    resStatu.parentElement.classList.add("red");
    resStatu.innerHTML = `Your lives are finished.`;
    player.classList.add("flex");
    livesRem.innerHTML = "0";
  } else {
    livesRem.innerText--;
    resStatu.parentElement.classList.remove("flex");
    resStatu.parentElement.classList.remove("red");
    resStatu.innerHTML = "";
    player.classList.remove("flex");
  }
  inputValue = "";
  input.value = "";
});

retry.addEventListener("click", () => {
  location.reload();
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    button.click();
  }
});

input.addEventListener("input", (e) => {
  inputValue = e.target.value;
});

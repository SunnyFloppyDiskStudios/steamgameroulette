let subButton = document.getElementById("user-submit");
let subBox = document.getElementById("user-id");

let gameSlot = document.getElementById("game-slot");

let steamID = "";
let fetchedData;

async function getData() {
    const response = await fetch(`https://sgr.biskitscheez.workers.dev/games?steamid=${steamID}`);

    const data = await response.json();

    fetchedData = data.response.games;

    console.log(fetchedData);

    getGame();
}

function getGame() {
    const randomElement = fetchedData[Math.floor(Math.random() * fetchedData.length)];

    gameSlot.innerText = randomElement.name;

    console.log(randomElement);

}

function getUserInfo() {
    steamID = subBox.value;

    console.log(steamID);

    getData();
}

subButton.addEventListener("click", getUserInfo);
subBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        getUserInfo();
    }
});
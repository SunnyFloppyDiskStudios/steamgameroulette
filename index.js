let subButton = document.getElementById("user-submit");
let subBox = document.getElementById("user-id");

let gameSlot = document.getElementById("game-slot");
let gameTime = document.getElementById("game-time");
let gameLastPlayed = document.getElementById("game-lastplayed");
let gameLink = document.getElementById("game-link");

let steamID = "";
let fetchedData;

let gameID;

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

    gameTime.innerText = `total playtime: ${randomElement.playtime_forever} minutes`
    gameLastPlayed.innerText = `last played: ${new Date(randomElement.rtime_last_played * 1000).toLocaleString()}`;

    gameID = randomElement.appid;
    gameLink.innerText = `link: ${gameID}`;

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

gameLink.addEventListener("click", (e) => {
    window.open(`https://store.steampowered.com/app/${gameID}`, "_blank").focus();
})

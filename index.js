// input uis
let subButton = document.getElementById("user-submit");
let subBox = document.getElementById("user-id");

// output uis
let gameSlot = document.getElementById("game-slot");
let gameTime = document.getElementById("game-time");
let gameLastPlayed = document.getElementById("game-lastplayed");
let gameLink = document.getElementById("game-link");

// spinner uis
let spinner = document.getElementById("spinner-object");

// input vars
let steamID = "";

// output vars
let fetchedData;
let gameID;
let listOfGames = [];

// get user info from box
function getUserInfo() {
    steamID = subBox.value;

    console.log(steamID);

    getData();
}

// get game data
async function getData() {
    const response = await fetch(`https://sgr.biskitscheez.workers.dev/games?steamid=${steamID}`);

    const data = await response.json();

    fetchedData = data.response.games;

    console.log(fetchedData);

    listOfGames = [];

    for (let i = 0; i < fetchedData.length; i++) {
        listOfGames.push(fetchedData[i].name);
    }

    console.log(listOfGames);

    createSpinnerList();
    getGame();
}

// get individual random game and relevant info
function getGame() {
    const randomElement = fetchedData[Math.floor(Math.random() * fetchedData.length)];

    gameSlot.innerText = randomElement.name;

    gameTime.innerText = `total playtime: ${randomElement.playtime_forever} minutes`
    gameLastPlayed.innerText = `last played: ${new Date(randomElement.rtime_last_played * 1000).toLocaleString()}`;

    gameID = randomElement.appid;
    gameLink.innerText = `link: ${gameID}`;

    console.log(randomElement);

}

// stupid spinner function
function createSpinnerList() {
    spinner.innerHTML = "";

    const angle = 360 / listOfGames.length;

    for (let i = 0; i < listOfGames.length; i++) {
        const game = document.createElement("p");

        game.innerText = listOfGames[i];
        game.classList.add("spinner-item");

        game.style.transform = `rotate(${angle * i}deg) translateX(20px)`;

        spinner.appendChild(game);
    }
}

// listeners
subButton.addEventListener("click", getUserInfo);
subBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        getUserInfo();
    }
});

gameLink.addEventListener("click", (e) => {
    window.open(`https://store.steampowered.com/app/${gameID}`, "_blank").focus();
})

let steamID = "sunnyflops" // temprarory

async function main() {
    const response = await fetch(
        `https://sgr.biskitscheez.workers.dev/games?steamid=${steamID}`
    );

    const data = await response.json();

    console.log(data.response.games);
}

main();
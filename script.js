"use strict";

const apiUrl =
  "https://ddragon.leagueoflegends.com/cdn/14.18.1/data/en_US/tft-champion.json";

const apiKey = "RGAPI-7abe84b4-ff74-4199-a7fb-16aaedb9da13";
const championContainer = document.getElementById("container");
const championContainer2 = document.getElementById("container2");
const allChampionsContainer = document.getElementById("allChampionsContainer");
const hexGrid = document.querySelector(".hex-grid");

const targetIds = [
  "TFT12_Zilean",
  "TFT12_Karma",
  "TFT12_Rakan",
  "TFT12_Bard",
  "TFT12_Milio",
  "TFT12_Morgana",
  "TFT12_Cassiopeia",
  "TFT12_Wukong",
];

const notAvaibale = [
  "Zed",
  "Garen",
  "Vi",
  "Lulu",
  "Pyke",
  "Lucian",
  "Khazix",
  "Lissandra",
  "Braum",
  "Darius",
  "Evelynn",
  "Gangplank",
  "Vayne",
  "Graves",
  "TwistedFate",
  "Kayle",
  "Nidalee",
  "RekSai",
  "Leona",
];

const checkImageExists = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

async function fetchChampion() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("data", data.data);

    const compNameDiv = document.createElement("div");
    compNameDiv.classList.add("comp-name-div");

    const iconImg = document.createElement("img");
    iconImg.src = "sIcon.png";
    iconImg.classList.add("icon");

    compNameDiv.appendChild(iconImg);

    const textNode = document.createTextNode("Vukikong Preserver");
    compNameDiv.appendChild(textNode);

    const tooltip = document.createElement("span");
    tooltip.classList.add("tooltiptext");
    tooltip.textContent = "This is BIS wallay!";

    compNameDiv.appendChild(tooltip);

    championContainer.appendChild(compNameDiv);

    compNameDiv.addEventListener("mouseover", () => {
      tooltip.style.visibility = "visible";
      tooltip.style.opacity = "1";
    });

    compNameDiv.addEventListener("mouseout", () => {
      tooltip.style.visibility = "hidden";
      tooltip.style.opacity = "0";
    });

    const championsArray = [];

    let displayCount = 0;

    for (const [key, value] of Object.entries(data.data)) {
      championsArray.push(value);
    }

    for (const item of championsArray) {
      if (displayCount >= 10) break;

      if (targetIds.includes(item.id)) {
        const imageUrl = `https://cdn.metatft.com/cdn-cgi/image/width=256,height=152,format=auto/https://cdn.metatft.com/file/metatft/championsplashes/tft12_${item.name.toLowerCase()}.png`;

        const imageExists = await checkImageExists(imageUrl);

        if (imageExists) {
          const championWrapper = document.createElement("div");
          championWrapper.classList.add("champion-wrapper");
          const championName = document.createElement("h4");
          championName.textContent = item.name;

          const championImg = document.createElement("img");
          championImg.src = imageUrl;
          championImg.alt = item.name;

          championContainer.appendChild(championWrapper);
          championWrapper.appendChild(championImg);
          championWrapper.appendChild(championName);

          displayCount++;
        }
      }
    }

    showAllChamps(championsArray);
  } catch (error) {
    console.log("Error fetching TFT Champion data:", error);
  }
}

async function showAllChamps(champs) {
  allChampionsContainer.innerHTML = "";

  for (const item of champs) {
    const imageUrl = `https://cdn.metatft.com/cdn-cgi/image/width=256,height=152,format=auto/https://cdn.metatft.com/file/metatft/championsplashes/tft12_${item.name.toLowerCase()}.png`;

    const imageExists = await checkImageExists(imageUrl);

    if (imageExists) {
      const bottomChampionWrapper = document.createElement("div");
      bottomChampionWrapper.classList.add("champion-wrapper");

      const bottomChampionImg = document.createElement("img");
      bottomChampionImg.src = imageUrl;
      bottomChampionImg.alt = item.name;
      bottomChampionImg.draggable = true;
      bottomChampionImg.classList.add("draggable-champion");

      bottomChampionImg.setAttribute("id", item.name.toLowerCase());

      const bottomChampionName = document.createElement("h4");
      bottomChampionName.textContent = item.name;

      bottomChampionImg.addEventListener("dragstart", handleDragStart);

      allChampionsContainer.appendChild(bottomChampionWrapper);
      bottomChampionWrapper.appendChild(bottomChampionImg);
      bottomChampionWrapper.appendChild(bottomChampionName);
    }
  }
}

function handleDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

function createHexGrid() {
  for (let i = 0; i < 28; i++) {
    const hexCell = document.createElement("div");
    hexCell.classList.add("hex-cell");

    hexCell.addEventListener("dragover", handleDragOver);
    hexCell.addEventListener("drop", handleDrop);

    hexGrid.appendChild(hexCell);
  }
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDrop(event) {
  event.preventDefault();

  const championId = event.dataTransfer.getData("text/plain");

  const draggedChampion = document.getElementById(championId);

  if (!event.target.querySelector("img")) {
    const clonedChampion = draggedChampion.cloneNode(true);

    event.target.appendChild(clonedChampion);
  }
}

function clearHexImages() {
  const hexCells = document.querySelectorAll(".hex-cell");

  hexCells.forEach((cell) => {
    const img = cell.querySelector("img");
    if (img) {
      cell.removeChild(img);
    }
  });
}

const clearHexesBtn = document.getElementById("clearHexesBtn");
clearHexesBtn.addEventListener("click", clearHexImages);

("use strict");

function countdownTimer(futureDate) {
  const targetDate = new Date(futureDate).getTime();

  const updateCountdown = setInterval(() => {
    const now = new Date();
    const totalSeconds = Math.floor((targetDate - now) / 1000);

    if (totalSeconds <= 0) {
      clearInterval(updateCountdown);
      console.log("Countdown Complete!");
      return;
    }

    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    document.getElementById(
      "countdown"
    ).innerText = `${days}d ${hours}h ${minutes}m ${seconds.toFixed(0)}s`;
  }, 1000);
}

countdownTimer("2024-11-06T23:59:59");

fetchChampion();

createHexGrid();

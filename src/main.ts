import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Pumpkin Harvest";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Initialize click counter and growth rate
let counter: number = 0;
let growthRate: number = 0;

// Initialize upgrade array type
const upgrades = [
  { name: "Seeds", emoji: "🌱", cost: 10, rate: 0.1, purchased: 0 },
  { name: "Fertilizer", emoji: "🪱", cost: 100, rate: 2.0, purchased: 0 },
  { name: "Tractor", emoji: "🚜", cost: 1000, rate: 50, purchased: 0 },
];

// Display counter
const counterDiv = document.createElement("div");
counterDiv.textContent = `Pumpkins Harvested: ${counter}`;
app.append(counterDiv);

// Display growth rate
const growthRateDiv = document.createElement("div");
growthRateDiv.textContent = `Growth Rate: ${growthRate} Pumpkins/sec`;
app.append(growthRateDiv);

// Adding button function
const button = document.createElement("button");
button.textContent = "🎃";
app.append(button);

// Add Counter when clicking the button
button.addEventListener("click", () => {
  counter++;
  updates();
});

upgrades.forEach((upgrade) => {
  // Adding upgrade buttons
  const upgradeButton = document.createElement("button");
  upgradeButton.textContent = `${upgrade.emoji}`;
  upgradeButton.disabled = true;
  app.append(upgradeButton);

  // Adding status/purchased upgrades
  const statusDiv = document.createElement("div");
  statusDiv.textContent = `${upgrade.name} Purchased: ${upgrade.purchased}`;
  app.append(statusDiv);

  // Clicking on upgrade
  upgradeButton.addEventListener("click", () => {
    if (counter >= upgrade.cost) {
      counter -= upgrade.cost;
      growthRate += upgrade.rate;
      upgrade.purchased++;
      upgrade.cost *= 1.15;
      updateUI();
    }
  });

  // Update UI function
  function updateUI() {
    counterDiv.textContent = `Pumpkins Harvested: ${counter.toFixed(0)}`;
    growthRateDiv.textContent = `Growth Rate: ${growthRate.toFixed(2)} Pumpkins/sec`;
    statusDiv.textContent = `${upgrade.name} Purchased: ${upgrade.purchased}`;
    upgradeButton.disabled = counter < upgrade.cost;
    upgradeButton.textContent = `${upgrade.emoji}`;
  }

  updateUI();
});

function updates() {
  counterDiv.textContent = `${counter.toFixed(0)} Pumpkins`;
  growthRateDiv.textContent = `Growth Rate: ${growthRate.toFixed(2)} Pumpkins/sec`;
  upgrades.forEach((upgrade, index) => {
    document.querySelectorAll("button")[index + 1].disabled =
      counter < upgrade.cost;
  });
}

// // Adding upgrade button function
// const upgradeButton = document.createElement("button");
// upgradeButton.textContent = "Buy Upgrade (+1/sec)";
// upgradeButton.disabled = true;
// app.append(upgradeButton);

// Set the initial timestamp
let lastTimestamp = performance.now();

function updateCounter(timestamp: number) {
  // Calculate the time elapsed since the last frame in seconds
  const deltaTime = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  // Increase the counter based on elapsed time and growth rate
  counter += growthRate * deltaTime;
  updates();

  // Request the next frame
  requestAnimationFrame(updateCounter);
}

// Start the animation loop
requestAnimationFrame(updateCounter);

// // Adding automatic clicking
// setInterval(() => {
//   counter++;
//   counterDiv.textContent = `${counter} Pumpkins`;
// }, 1000);

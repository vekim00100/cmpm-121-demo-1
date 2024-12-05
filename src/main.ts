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

// Define and initialize UI components
const counterDiv = document.createElement("div");
const growthRateDiv = document.createElement("div");
counterDiv.textContent = `Pumpkins Harvested: ${counter}`;
growthRateDiv.textContent = `Growth Rate: ${growthRate} Pumpkins/sec`;

app.append(counterDiv, growthRateDiv);

// Define the Item type
interface Item {
  name: string;
  emoji: string;
  cost: number;
  rate: number;
  purchased: number;
  description: string;
}

// Initialize available items array type
const availableItems: Item[] = [
  {
    name: "Seeds",
    emoji: "🌱",
    cost: 10,
    rate: 0.1,
    purchased: 0,
    description: "Basic seeds to grow pumpkins.",
  },
  {
    name: "Fertilizer",
    emoji: "🪱",
    cost: 100,
    rate: 2.0,
    purchased: 0,
    description: "Enhances soil quality for faster growth.",
  },
  {
    name: "Tractor",
    emoji: "🚜",
    cost: 1000,
    rate: 50,
    purchased: 0,
    description: "A powerful machine to automate farming.",
  },
  {
    name: "Greenhouse",
    emoji: "🏠",
    cost: 5000,
    rate: 200,
    purchased: 0,
    description: "A controlled environment to maximize yield.",
  },
  {
    name: "Pumpkin Festival",
    emoji: "🎉",
    cost: 20000,
    rate: 1000,
    purchased: 0,
    description: "Attract visitors for massive pumpkin profits!",
  },
];

// Adding button function
const button = document.createElement("button");
button.textContent = "🎃";
app.append(button);

// Add Counter when clicking the button
button.addEventListener("click", () => {
  counter++;
  updates();
});

// Game logic for handling item purchase
function handleItemPurchase(item: Item) {
  if (counter >= item.cost) {
    counter -= item.cost;
    growthRate += item.rate;
    item.purchased++;
    item.cost *= 1.15;
    updateUI();
  }
}

// UI creation for each item
function createItemUI(item: Item) {
  const upgradeButton = document.createElement("button");
  upgradeButton.textContent = `${item.emoji}`;
  upgradeButton.disabled = true;

  const descriptionDiv = document.createElement("div");
  descriptionDiv.textContent = item.description;

  const statusDiv = document.createElement("div");
  statusDiv.textContent = `${item.name} Purchased: ${item.purchased}`;

  upgradeButton.addEventListener("click", () => handleItemPurchase(item));

  app.append(upgradeButton, descriptionDiv, statusDiv);

  // Update UI for this item
  return { upgradeButton, statusDiv }; // Return references for later updating
}

// Create UI for each available item
const itemElements = availableItems.map(createItemUI);

// Update UI for all elements
function updateUI() {
  counterDiv.textContent = `Pumpkins Harvested: ${counter.toFixed(0)}`;
  growthRateDiv.textContent = `Growth Rate: ${growthRate.toFixed(2)} Pumpkins/sec`;

  // Update the status and button for each item
  availableItems.forEach((item, index) => {
    const { upgradeButton, statusDiv } = itemElements[index];
    statusDiv.textContent = `${item.name} Purchased: ${item.purchased}`;
    upgradeButton.disabled = counter < item.cost;
  });
}

// Update counter and UI
function updates() {
  counterDiv.textContent = `${counter.toFixed(0)} Pumpkins`;
  growthRateDiv.textContent = `Growth Rate: ${growthRate.toFixed(2)} Pumpkins/sec`;
  availableItems.forEach((item, index) => {
    document.querySelectorAll("button")[index + 1].disabled =
      counter < item.cost;
  });
}

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

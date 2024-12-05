import "./style.css";

// Define the game state in an encapsulated object
interface GameState {
  counter: number;
  growthRate: number;
  lastTimestamp: number;
}

const gameState: GameState = {
  counter: 0,
  growthRate: 0,
  lastTimestamp: performance.now(),
};

// Set up the app and title
const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Pumpkin Harvest";
document.title = gameName;

// Initialize header
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Define and initialize UI components
const counterDiv = document.createElement("div");
const growthRateDiv = document.createElement("div");
counterDiv.textContent = `Pumpkins Harvested: ${gameState.counter}`;
growthRateDiv.textContent = `Growth Rate: ${gameState.growthRate} Pumpkins/sec`;

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

// Initialize available items array
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

// Initialize main action button
const button = document.createElement("button");
button.textContent = "🎃";
app.append(button);

// Button event listener for increasing counter
button.addEventListener("click", () => {
  gameState.counter++;
  updateUI();
});

// Handle item purchase
function handleItemPurchase(item: Item) {
  if (gameState.counter >= item.cost) {
    gameState.counter -= item.cost;
    gameState.growthRate += item.rate;
    item.purchased++;
    item.cost *= 1.15;
    updateUI();
  }
}

// Create UI for each item
function createItemUI(item: Item) {
  const upgradeButton = document.createElement("button");
  upgradeButton.textContent = `${item.emoji}`;
  upgradeButton.style.display = "none"; // Initially hide the button

  const descriptionDiv = document.createElement("div");
  descriptionDiv.textContent = item.description;
  descriptionDiv.style.display = "none"; // Initially hide the description

  const statusDiv = document.createElement("div");
  statusDiv.textContent = `${item.name} Purchased: ${item.purchased}`;
  statusDiv.style.display = "none"; // Initially hide the status count

  upgradeButton.addEventListener("click", () => handleItemPurchase(item));

  app.append(upgradeButton, descriptionDiv, statusDiv);

  return { upgradeButton, descriptionDiv, statusDiv };
}

// Create UI for all items
const itemElements = availableItems.map(createItemUI);

// Update UI
function updateUI() {
  counterDiv.textContent = `Pumpkins Harvested: ${gameState.counter.toFixed(0)}`;
  growthRateDiv.textContent = `Growth Rate: ${gameState.growthRate.toFixed(2)} Pumpkins/sec`;

  availableItems.forEach((item, index) => {
    const { upgradeButton, descriptionDiv, statusDiv } = itemElements[index];
    statusDiv.textContent = `${item.name} Purchased: ${item.purchased}`;

    // Make the button, description, and status visible when the player can afford the item
    if (gameState.counter >= item.cost) {
      upgradeButton.style.display = "inline-block"; // Show the button
      descriptionDiv.style.display = "block"; // Show the description
      statusDiv.style.display = "block"; // Show the purchase status
    }

    upgradeButton.disabled = gameState.counter < item.cost; // Disable button if not affordable
  });
}

// Update game state and UI during the animation loop
function updateCounter(timestamp: number) {
  const deltaTime = (timestamp - gameState.lastTimestamp) / 1000;
  gameState.lastTimestamp = timestamp;

  gameState.counter += gameState.growthRate * deltaTime;
  updateUI();

  requestAnimationFrame(updateCounter);
}

// Start the animation loop
requestAnimationFrame(updateCounter);

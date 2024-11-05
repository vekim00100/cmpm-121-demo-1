import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My awesome game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Initialize click counter
let counter: number = 0;
let growthRate: number = 0; 

// Display counter
const counterDiv = document.createElement("div");
counterDiv.textContent = `${counter} Pumpkins`;
app.append(counterDiv);

// Adding button function
const button = document.createElement("button");
button.textContent = "🎃";
app.append(button);

button.addEventListener("click", () => {
    counter++;
    updateUI();
});

// Adding upgrade button function
const upgradeButton = document.createElement("button");
upgradeButton.textContent = "Buy Upgrade (+1/sec)";
upgradeButton.disabled = true;
app.append(upgradeButton);

upgradeButton.addEventListener("click", () => {
    if (counter >= 10) {
        counter -= 10;
        growthRate += 1;
        updateUI();
    }
});

// Update UI function
function updateUI() {
    counterDiv.textContent = `${counter.toFixed(0)} Pumpkins`;
    upgradeButton.disabled = counter < 10; // Disable if counter is less than 10
}

// Set the initial timestamp
let lastTimestamp = performance.now();

function updateCounter(timestamp: number) {
    // Calculate the time elapsed since teh last frame in seconds
    const deltaTime = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    // Increase the counter based on elapsed time and growth rate
    counter += growthRate * deltaTime;
    updateUI();

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

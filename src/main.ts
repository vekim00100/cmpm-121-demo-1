import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My awesome game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Initialize click counter
let counter: number = 0;

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
  counterDiv.textContent = `${counter} Pumpkins`;
});

// Adding continuous growth
let lastTimestamp = performance.now();

function updateCounter(timestamp: number) {
    const deltaTime = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    counter += deltaTime;
    counterDiv.textContent = `${counter.toFixed(2)} Pumpkins`;

    requestAnimationFrame(updateCounter);
}

requestAnimationFrame(updateCounter);

// // Adding automatic clicking
// setInterval(() => {
//   counter++;
//   counterDiv.textContent = `${counter} Pumpkins`;
// }, 1000);

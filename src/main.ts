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

button.addEventListener('click', () => {
    counter++;
    counterDiv.textContent = `${counter} Pumpkins`;
});

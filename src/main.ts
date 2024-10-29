import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My awesome game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Adding button function
const button = document.createElement("button");
button.textContent = "🎃";
app.append(button);

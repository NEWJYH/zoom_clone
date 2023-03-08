const socket = io();

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");
const roomForm = room.querySelector("form");

room.hidden = true;

let roomName;

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, () => {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
  });
  roomName = input.value;
  input.value = "";
});

roomForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const roomInput = room.querySelector("input");
  socket.emit("message", roomInput.value, roomName, () => {
    addMessage(`You: ${roomInput.value}`);
    roomInput.value = "";
    roomInput.focus();
  });
});

socket.on("welcome", () => {
  addMessage("Someone joined!");
});

socket.on("bye", () => {
  addMessage("Someone left");
});

socket.on("message", addMessage);

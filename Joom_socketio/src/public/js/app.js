const socket = io();

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

const msgForm = document.getElementById("msg");
const nameForm = document.getElementById("name");

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

msgForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const roomInput = msgForm.querySelector("input");
  socket.emit("message", roomInput.value, roomName, () => {
    addMessage(`You: ${roomInput.value}`);
    roomInput.value = "";
    roomInput.focus();
  });
});

nameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameInput = nameForm.querySelector("input");
  socket.emit("nickname", nameInput.value);
  nameForm.hidden = true;
});

socket.on("welcome", (user) => {
  addMessage(`${user} joined!`);
});

socket.on("bye", (user) => {
  addMessage(`${user} left`);
});

socket.on("message", addMessage);

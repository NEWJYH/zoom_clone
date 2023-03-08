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
  const input = document.getElementById("roomname");
  const nickInput = document.getElementById("nickname");
  socket.emit("nickname", nickInput.value);
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

socket.on("welcome", (user, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${user} joined!`);
});

socket.on("bye", (user, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${user} left`);
});

socket.on("message", addMessage);

socket.on("room_change", (rooms) => {
  const roomList = welcome.querySelector("ul");
  roomList.innerHTML = "";
  if (rooms.length === 0) {
    return;
  }
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.append(li);
  });
});

const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
  console.log("==========Server==========");
  console.log(message.data);
  console.log("==========================");
  const li = document.createElement("li");
  li.innerText = message.data.toString();
  messageList.appendChild(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  const message = input.value;
  socket.send(message);
  input.value = "";
  input.focus();
});

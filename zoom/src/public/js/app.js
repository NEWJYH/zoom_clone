const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
  console.log("==========Server==========");
  console.log(message.data);
  console.log("==========================");
});

setTimeout(() => {
  socket.send("hello from the browser!");
}, 10000);

// let messageCount = 0;
// setInterval(() => {
//   socket.send(`${++messageCount}`);
// }, 1000);

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

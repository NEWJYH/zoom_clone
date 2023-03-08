const socket = io();

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = form.querySelector("input");
  // websocket.send와 같음
  // 원하는 것을 emit해주면됨
  
  /**
   * event 이름
   * payload 보내고 싶은 데이터
   * function 서버에서 호출할수 있는 함수
   */
  socket.emit("enter_room", { payload: input.value }, () => {
    console.log("server is done!");
  });
  input.value = "";
});

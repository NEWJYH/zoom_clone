import WebSocket from "ws";
import http from "http";
import express from "express";

const app = express();
const port = 3000;

// json file 입출력 설정
app.use(express.json());

// pug 설정
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

// static 작업
app.use("/public", express.static(__dirname + "/public"));

// route 설정
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

// ws 설정
const server = http.createServer(app);
// http와 webSocket 둘다 작동시키기 위함
// WebSocket.Server({server]})를 넘기게 되면 http서버와 webSocket 서버둘다 돌릴수 있음
const wss = new WebSocket.Server({ server });
// http 서버를 원하지 않는다면 인자로 넘길 필요 없음

// 소켓에 연결되면 array에 소캣을 넣어서 동기화 시키기 위함
// 1대1연결에서 다대일로 변경
let sockets = [];

// 웹소켓 이벤트
let cnt = 0;
wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = `anonymous ${++cnt}`;
  console.log("Connected to Browser ✅");
  console.log(`현재 접속중 : ${sockets.length}`);
  socket.on("message", (msg) => {
    const message = JSON.parse(msg);
    switch (message.type) {
      case "nickname":
        socket["nickname"] = message.payload;
        break;
      case "message":
        sockets.forEach((sock) => {
          if (sock.nickname !== socket.nickname) {
            sock.send(`${socket.nickname}: ${message.payload}`);
          }
        });
        break;

      default:
        break;
    }
  });

  socket.on("close", () => {
    sockets = sockets.filter((sock) => {
      return sock !== socket;
    });
    console.log("Disconnected from Browser ❌");
    console.log(`현재 접속중 : ${sockets.length}`);
  });
});

server.listen(port, () => {
  console.log(`Joom app listening on http://localhost:${port}`);
});

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
const handleListen = () =>
  console.log(`Joom app listening on http://localhost:${port}`);
const server = http.createServer(app);
// http와 webSocket 둘다 작동시키기 위함
// WebSocket.Server({server]})를 넘기게 되면 http서버와 webSocket 서버둘다 돌릴수 있음
const wss = new WebSocket.Server({ server });
// http 서버를 원하지 않는다면 인자로 넘길 필요 없음


function handleConnection(socket) {
  console.log(socket);
}
// 웹소켓 이벤트
wss.on("connection", handleConnection);





server.listen(port, handleListen);

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
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

app.listen(port, () => {
  console.log(`Joom app listening on port ${port}`);
  console.log(`http://localhost:3000`);
});

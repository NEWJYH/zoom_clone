import express from "express";

const app = express();

const port = 3000;

app.use(express.json());

console.log("Hello");

app.listen(port, () => {
  console.log(`Joom app listening on port ${port}`);
});

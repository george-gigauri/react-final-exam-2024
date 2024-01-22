const dotenv = require("dotenv").config();
const express = require('express');
const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const verifyToken = require("./middlewares/verifyToken");
const jwt = require("jsonwebtoken");
const app = express();
const router = jsonServer.router('reptiles.json');
const middlewares = jsonServer.defaults();

const TOKEN_SECRET = dotenv.parsed.TOKEN_SECRET;

console.log(TOKEN_SECRET);

app.use(bodyParser.json());
app.use(middlewares);

app.use("/sign-in", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ id: 1, nickName: "root", username }, TOKEN_SECRET);
    return res.send({ token });
  }
  return res.status(401).send({ msg: "Unathorized" });
});

app.use("/profile", [verifyToken], (req, res) => {
  const { id, username } = req.user;
  return res.send({ id, username });
});

app.use(router);

const port = 8001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

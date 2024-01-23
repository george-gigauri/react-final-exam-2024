const dotenv = require("dotenv").config();
const express = require('express');
const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const verifyToken = require("./middlewares/verifyToken");
const jwt = require("jsonwebtoken");
const Const = require("../src/util/Const");
const app = express();
const router = jsonServer.router('reptiles.json');
const middlewares = jsonServer.defaults();

const TOKEN_SECRET = dotenv.parsed.TOKEN_SECRET;
console.log(TOKEN_SECRET);

app.use(bodyParser.json());
app.use(middlewares);

app.use("/sign-in", (req, res) => {

  if (req.method !== "POST") {
    return res.status(405);
  }

  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ id: 1, username: "admin", username }, TOKEN_SECRET);
    return res.send({ jwtToken: token });
  }
  return res.status(400).send({ error: "ავტორიზაციის პარამეტრები არასწორია" });
});

app.use("/sign-up", (req, res) => {

  if (req.method !== "POST") {
    return res.status(405);
  }

  const { username, firstName, lastName, password } = req.body;
  if (!Const.REGEX_USERNAME.test(username)) {
    return res.status(400).send("მომხმარებლის სახელი უნდა შეიცავდეს პატარა (Lowercase) ასოებს და მხოლოდ შემდეგ სიმბოლოებს: _ - .");
  }

  if (!Const.REGEX_PASSWORD.test(password)) {
    return res.status(400).send("მომხმარებლის პაროლი უნდა შედგებოდეს მინიმუმ ერთი პატარა და დიდი ასოსგან, მინიმუმ ერთი ციფრისგან და სიმბოლოსგან, ჯამში, მინიმუმ 8 ასოსგან.")
  }

  return res.status(200);
});

app.use("/profile", [verifyToken], (req, res) => {
  const { id, username } = req.user;
  return res.send({ id, username });
});

app.use(router);

app.listen(Const.SERVER_PORT, () => {
  console.log(`Server is running on http://localhost:${Const.SERVER_PORT}`);
});

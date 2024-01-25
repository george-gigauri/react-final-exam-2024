const UserService = require("./services/UserService.js");
const ReptileService = require("./services/ReptileService.js");
const dotenv = require("dotenv").config();
const express = require('express');
const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const verifyToken = require("./middlewares/verifyToken");
const jwt = require("jsonwebtoken");
const Const = require("../src/util/Const");
const app = express();
const router = jsonServer.router('./db/data.json');
const middlewares = jsonServer.defaults();

const TOKEN_SECRET = dotenv.parsed.TOKEN_SECRET;
console.log(TOKEN_SECRET);

app.use(bodyParser.json());
app.use(middlewares);

app.post("/sign-in", async (req, res) => {
  const { username, password } = req.body;
  let response;
  if (username !== undefined && password !== undefined) {

    // Check if user exists with provided username
    await UserService.getUserByUsernameAndPassword({ username, password }, (user) => {
      const token = jwt.sign({ id: user.id, username: user.username }, TOKEN_SECRET);
      response = res.send({ jwtToken: token });
    }, (httpCode, errorMessage) => {
      response = res.status(httpCode).send({ error: errorMessage });
    });
  }

  return response;
});

app.post("/sign-up", async (req, res) => {
  const { username, firstName, lastName, password } = req.body;

  if (!Const.REGEX_USERNAME.test(username)) {
    return res.status(400).send({ error: "მომხმარებლის სახელი უნდა შეიცავდეს პატარა (Lowercase) ასოებს და მხოლოდ შემდეგ სიმბოლოებს: _ - ." });
  }

  if (!Const.REGEX_PASSWORD.test(password)) {
    return res.status(400).send({ error: "მომხმარებლის პაროლი უნდა შედგებოდეს მინიმუმ ერთი პატარა და დიდი ასოსგან, მინიმუმ ერთი ციფრისგან და სიმბოლოსგან, ჯამში, მინიმუმ 8 ასოსგან." })
  }

  // Check if user exists with provided username
  let userNameExists = await UserService.findUserWithUsernameExists({ username: username });
  if (userNameExists) {
    return res.status(400).send({ error: "მომხმარებელი ამ იუზერნეიმით უკვე არსებობს" });
  }

  // Make new user record
  await UserService.createUser(
    {
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: password
    },
    (user) => {
      if (user.username === username) {
        return res.status(200).send(user);
      } else {
        return res.status(500).send({ error: "მოხდა გაუთვალისწინებელი შეცდომა" });
      }
    },
    (httpCode, errorMessage) => {
      return res.status(httpCode).send({ error: errorMessage });
    }
  )
});

app.get("/reptiles/get-all", async (req, res) => {
  const { page, pageSize, filters, sortBy } = req.query;
  await ReptileService.getReptiles(
    {
      page: page, pageSize: pageSize,
      filters: filters, sortBy: sortBy
    },
    (data) => {
      return res.send(data);
    },
    (httpCode, errorMessage) => {
      return res.status(httpCode).send({ error: errorMessage });
    }
  )
});

app.post("/reptiles/create-new", [verifyToken], async (req, res) => {
  const { name, scientificName, description, imageUrl, isVenomous, isEndangered, type } = req.body;

  // Make new reptile record
  await ReptileService.create(
    {
      name: name,
      scientificName: scientificName,
      description: description,
      imageUrl: imageUrl,
      isEndangered: isEndangered,
      isVenomous: isVenomous,
      type: type
    },
    (reptile) => {
      return res.status(200).send(reptile);
    },
    (httpCode, errorMessage) => {
      return res.status(httpCode).send({ error: errorMessage });
    }
  );
});

app.delete("/reptiles/:id/delete", [verifyToken], async (req, res) => {
  const { id } = req.params;
  let response;

  await ReptileService.deleteById(id, () => {
    response = res.send({ success: true });
  }, (httpCode, errorMessage) => {
    response = res.status(httpCode).send({ error: errorMessage });
  });

  return response;
});

app.use(router);

app.listen(Const.SERVER_PORT, () => {
  console.log(`Server is running on http://localhost:${Const.SERVER_PORT}`);
});

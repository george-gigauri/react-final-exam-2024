const fetch = require('cross-fetch');

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
  if (username !== undefined && password !== undefined) {
    // Check if user exists with provided username
    let usersRes = await fetch(`${Const.SERVER_BASE_URL}/users`)
    if (usersRes.ok) {
      let usersJson = await usersRes.json();
      let usersWithUsername = usersJson.filter(u => u.username === username && u.password === password)
      if (usersWithUsername.length > 0) {
        let user = usersWithUsername[0];
        const token = jwt.sign({ id: user.id, username: user.username }, TOKEN_SECRET);
        return res.send({ jwtToken: token });
      }
    }
  }
  return res.status(400).send({ error: "ავტორიზაციის პარამეტრები არასწორია" });
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
  let usersRes = await fetch(`${Const.SERVER_BASE_URL}/users`)
  if (usersRes.ok) {
    let usersJson = await usersRes.json();
    let usersWithUsername = usersJson.filter(u => u.username === username)
    if (usersWithUsername.length > 0) {
      return res.status(400).send({ error: "მომხმარებელი ამ იუზერნეიმით უკვე არსებობს" });
    }
  }

  // Make new user record
  let r = await fetch(`${Const.SERVER_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: password
    })
  });

  let rJson = await r.json();
  if (r.ok) {
    if (rJson.username === username) {
      return res.status(200).send();
    } else {
      return res.status(500).send({ error: "მოხდა გაუთვალისწინებელი შეცდომა" });
    }
  } else {
    return res.status(500).send({ error: "სერვერის შეცდომა" })
  }
});

app.get("/profile", [verifyToken], (req, res) => {
  const { id, username } = req.user;
  return res.send({ id, username });
});

app.post("/reptiles/create-new", [verifyToken], async (req, res) => {
  const { name, scientificName, description, imageUrl, isVenomous, isEndangered, type } = req.body;

  // Make new reptile record
  let r = await fetch(`${Const.SERVER_BASE_URL}/reptiles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      scientificName: scientificName,
      description: description,
      imageUrl: imageUrl,
      isEndangered: isEndangered,
      isVenomous: isVenomous,
      type: type
    })
  });

  let rJson = await r.json();
  if (r.ok) {
    if (rJson.scientificName === scientificName) {
      return res.status(200).send(rJson);
    } else {
      return res.status(500).send({ error: "მოხდა გაუთვალისწინებელი შეცდომა" });
    }
  } else {
    return res.status(500).send({ error: "სერვერის შეცდომა" })
  }

});

app.delete("/reptiles/:id/delete", [verifyToken], async (req, res) => {
  const { id } = req.params;

  // Check if reptile exists with provided ID
  let reptilesRes = await fetch(
    `${Const.SERVER_BASE_URL}/reptiles/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  if (!reptilesRes.ok) {
    if (reptilesRes.status === 404) {
      return res.status(404).send({ error: "ჩანაწერი ამ იდენტიფიკატორით ვერ მოიძებნა" });
    } else {
      return res.status(500).send({ error: "სერვერის შეცდომა" });
    }
  }

  return res.send({ success: true });
});

app.use(router);

app.listen(Const.SERVER_PORT, () => {
  console.log(`Server is running on http://localhost:${Const.SERVER_PORT}`);
});

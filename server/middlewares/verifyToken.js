const jwt = require("jsonwebtoken");

const TOKEN_SECRET = process.env.TOKEN_SECRET;

console.log("token secret in verifyToken is: " + TOKEN_SECRET);

const verifyToken = (req, res, next) => {
  const { headers } = req;

  if (!headers.authorization) {
    return res.status(400).send({ error: "ავტორიზაციის ტოკენის შევსება სავალდებულოა" });
  }

  const [type, token] = headers.authorization.split(" ");

  if (type !== "JWT" || !token) {
    return res.status(401).send({ error: "ავტორიზაციის ტოკენი ვადაგასულია ან არასწორია" });
  }
  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({ error: "არ ხართ ავტორიზებული" });
  }
  return next();
};

module.exports = verifyToken;
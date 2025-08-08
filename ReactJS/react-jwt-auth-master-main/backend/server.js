const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = "secret123";
let users = [];

// REGISTER
app.post("/api/auth/signup", (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  users.push({ id: users.length + 1, username, email, password: hashedPassword, roles: ["ROLE_USER"] });
  res.json({ message: "User registered successfully!" });
});

// LOGIN
app.post("/api/auth/signin", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(404).send({ message: "User Not found." });

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) return res.status(401).send({ accessToken: null, message: "Invalid Password!" });

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 86400 });
  res.json({ id: user.id, username: user.username, email: user.email, roles: user.roles, accessToken: token });
});

// PROFILE TEST ROUTE
app.get("/api/test/user", (req, res) => {
  res.json(users);
});

app.listen(5050, () => console.log("✅ Backend running on http://localhost:5050"));



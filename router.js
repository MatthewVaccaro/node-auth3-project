const express = require("express");
const router = express.Router();
const db = require("./helperFunctions");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateToken = require("./validateToken");

router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "BIG MISTAKE!" });
    }
    const newUser = await db.register(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log("req.body", req.body);
    // Does that body have anything?
    if (!username || !password) {
      return res.status(400).json({ message: "BIG MISTAKE!" });
    }
    //Does the user exist
    const user = await db.findUser({ username });
    if (!user) {
      return res.status(404).json({ message: "Nope, didnt find that." });
    }
    console.log("password", password);
    console.log("user.password", user.password);
    //is the password correct (hash)
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res.status(400).json({ message: "Naw, that aint it" });
    }
    //A payload for the token
    payload = {
      id: user.id,
      department: user.department
    };
    //Give the client a token to store locally
    const token = jwt.sign(payload, "Oreos are the shit");

    return res.status(200).json({
      message: `welcome ${user.username} from department ${user.department}`,
      token: token
    });
  } catch (error) {
    next(error);
  }
});

router.get("/allUsers", validateToken(), async (req, res, next) => {
  try {
    const allUsers = await db.getAll();
    return res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

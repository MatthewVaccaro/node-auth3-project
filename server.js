const express = require("express");
const router = require("./router");

const server = express();
server.use(express.json());

server.use("/api", router);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome To Auth 3" });
});

module.exports = server;

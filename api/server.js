const express = require("express");
const cors = require("cors");

const server = express();
server.use(cors());
server.use(express.json());

const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
server.use("/users", userRoutes);
server.use("/posts", postRoutes);

server.get("/", (req, res) => res.send("Welcome to AdamHub"));

module.exports = server;

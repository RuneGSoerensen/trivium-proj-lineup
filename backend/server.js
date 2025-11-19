import express from "express";
import { requireAuth } from "./auth/auth.js";

const server = express();
const PORT = process.env.PORT || 3000;

server.get("/", (req, res) => {
  res.send("Server is running TRIVIUM");
});

server.get("/user", requireAuth, (req, res) => {
  res.json({ message: "Authenticated request", userId: req.userId });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

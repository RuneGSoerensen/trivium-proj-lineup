import express from "express";
import usersRouter from "./routes/users.js";
import { requireAuth } from "./middelware/auth.js";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Mount users router
app.use("/user", usersRouter);

app.get("/", (req, res) => {
  res.send("Server is running TRIVIUM");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

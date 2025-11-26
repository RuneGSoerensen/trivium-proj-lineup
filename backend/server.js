import express from "express";
import usersRouter from "./routes/user.js";
import editUserRouter from "./routes/edit-user.js";
import { requireAuth } from "./middelware/auth.js";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Mount users router
app.use("/users", usersRouter);
app.use("/edit", editUserRouter);
app.get("/", (req, res) => {
  res.send("Server is running TRIVIUM");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

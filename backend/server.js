import express from "express";
import cors from "cors";
import usersRouter from "./routes/user.js";
import { requireAuth } from "./middelware/auth.js";
const app = express();
const PORT = process.env.PORT || 3300;

// Before production this needs to be changed to a valid url, or something more secure.
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust this to your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE, PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Mount users router
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("Server is running TRIVIUM");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

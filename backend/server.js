import express from "express";
import cors from "cors";
import usersRouter from "./modules/user/router.js";
import connectionsRouter from "./modules/connections/router.js";
import notesRouter from "./modules/notes/router.js";
import lookingForTagsRouter from "./modules/looking_for/router.js";
import { requireAuth } from "./middelware/auth.js";
import genreRouter from "./modules/genres/router.js";
import chatRouter from "./modules/chat/router.js";
const app = express();
const PORT = process.env.PORT || 3000;
// Before production this needs to be changed to a valid url, or something more secure.
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // Adjust this to your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Mount users router
app.use("/users", usersRouter);
app.use("/connections", connectionsRouter);
app.use("/notes", notesRouter);

app.get("/", (req, res) => {
  res.send("Server is running TRIVIUM");
});
app.use("/genres", genreRouter);
app.use("/looking_for_tags", lookingForTagsRouter);
app.use("/chat", chatRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

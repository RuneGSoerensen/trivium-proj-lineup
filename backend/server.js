import express from "express";
import cors from "cors";
import usersRouter from "./routes/user.js";
import connectionsRouter from "./routes/connections.js";
import notesRouter from "./routes/notes.js";
import lookingForTagsRouter from "./routes/looking_for.js";
import { requireAuth } from "./middelware/auth.js";
import genreRouter from "./routes/genres.js";
import chatRouter from "./routes/chat.js";
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
app.use("/chat", requireAuth, chatRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

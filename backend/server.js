import express from "express";
import { ConnectDB } from "./Config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import router from "./routes/entry.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Connect DB
ConnectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://your-production-domain.com"
        : "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// API routes
app.use("/api/entries", router);

// Serve frontend
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "/frontend/dist");

  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

import express from "express";
import cors from "cors";
import coachRoutes from "./routes/coachRoutes";

const app = express();

// Middleware - Apply CORS before other middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/coach", coachRoutes);

export default app;
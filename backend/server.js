import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// HANDLING RESPOND DATA
app.use(express.json());
app.use(cookieParser());

// CORS POLICY
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:8080"],
    credentials: true,
  })
);

// ROUTES
app.use("/api/order", orderRoutes);
app.use("/api/auth", authRoutes);

// ERROR HANDLERS
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

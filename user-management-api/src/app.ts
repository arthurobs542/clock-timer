import express from "express";
import { json } from "body-parser";
import { userRoutes } from "./routes/userRoutes";
import connectToDatabase from "./config/database";
// import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(json());

// Connect to the database
connectToDatabase();

// Routes
app.use("/api/users", userRoutes);

// Error handling middleware
// app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

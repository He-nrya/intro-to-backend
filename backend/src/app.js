import express from "express";

const app = express(); //create an express app

app.use(express.json()); //middleware to parse incoming JSON requests

//routes
import userRoutes from "./routes/user.routes.js";

//routes decleration
app.use("/api/v1/users", userRoutes);

//example route: http://localhost:4000/api/v1/users/register

export default app;
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import { connectDB } from "./utils/features.js";

import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import { createUser } from "./seeders/user.js";

dotenv.config({
    path:"./.env",
});

const mongoURI = process.env.MONGO_URI;
const port =  process.env.PORT || 3000;

connectDB(mongoURI);

// createUser(10);

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/chat", chatRoute);

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
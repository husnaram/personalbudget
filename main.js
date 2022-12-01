import * as dotenv from "dotenv";
import express from "express";

dotenv.config();

const port = process.env.PORT;
const app = express();

app.get("/", (req, res) => res.send("Hello, Worl"));

app.listen(port, () => console.log(`⚡️[server]: Server is running at https://localhost:${port}`));